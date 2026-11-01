import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Reading } from '../types'
import { GAP, contextRow, fit, windowRow } from './usage'
import type { Level, Row } from './usage'

// Usage band: the 5-hour and 7-day limits (pace marker, time to reset, run-out when over
// pace) and the context window (compaction marker) above the prompt. Figures come from the
// engine's own measurements; a one-minute tick keeps the countdowns current between turns.

const NAME = 'usage-band'
const readingAtom = atom({ plugin: 'usage-band', key: 'reading' } as const, null)
const compactAtom = atom({ plugin: 'usage-band', key: 'compact' } as const, null)
const repliedAtom = atom({ plugin: 'usage-band', key: 'replied' } as const, false)

const TICK_MS = 60_000
const SWITCH_MS = 3_000
const NBSP = ' '
/** Bar cells off the terminal, where no width can be trusted: the 6-cell level, with full text. */
const FLOW_CELLS = 6
const COLOR: Record<Level, string | undefined> = { neutral: undefined, green: '#16a34a', yellow: '#ca8a04', red: '#dc2626' }

// Module variables reset on a reload; the readings live in $.state.
let home = ''
// The /mods switch: "usage-band": false in ~/.claude/mods/switches.json turns the band off in every chat.
let off = false

async function readSwitch($: EngineInterface) {
  let nowOff = off
  try {
    const path = `${home}/.claude/mods/switches.json`
    const json = (await $.fs.exists(path)) ? (JSON.parse(await $.fs.read(path)) as Record<string, unknown>) : {}
    nowOff = json[NAME] === false
  } catch {
    // A broken or missing file changes nothing.
  }
  if (nowOff === off) return
  off = nowOff
  $.ui.invalidate('ui.render')
}

/** The compaction point is read again only when the window changes (a model switch). */
async function readCompact($: EngineInterface, window: number) {
  const known = await read($, compactAtom)
  if (known && known.window === window) return
  let at: number | null = null
  try {
    // `summary` estimates locally and sends no request.
    const u = await $.session.usage({ breakdown: 'summary' })
    at = u.context.breakdown?.autoCompactThreshold ?? null
  } catch {
    // No marker this time; the next measurement tries again.
    return
  }
  await update($, compactAtom, () => ({ window, at }))
}

async function take($: EngineInterface, reading: Reading) {
  await update($, readingAtom, () => reading)
  if (reading.context.tokens !== undefined) await update($, repliedAtom, () => true)
  if (reading.context.window) await readCompact($, reading.context.window)
}

const pick = ({ rateLimits, context }: Reading): Reading => ({
  rateLimits: rateLimits.map(({ kind, percentUsed, resetsAt }) => ({ kind, percentUsed, resetsAt })),
  context: { tokens: context.tokens, window: context.window, percent: context.percent },
})

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    home = (await $.env.get('HOME')) ?? ''
    await readSwitch($)
    $.clock.every(SWITCH_MS, () => void readSwitch($))
    $.clock.every(TICK_MS, () => $.ui.invalidate('ui.render'))
    try {
      await take($, pick(await $.session.usage()))
    } catch {
      // The first session.measure fills it in.
    }
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    await take($, pick(e))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (off || e.props.hasSurvey) return next(e)
    const reading = await read($, readingAtom)
    if (!reading) return next(e)
    const rest = await next(e)

    const { Box, Text } = $.ui.resolve(e)
    const now = await $.clock.now()
    const limit = (kind: string) => reading.rateLimits.find(l => l.kind === kind)
    // After a reply, no limits at all means none apply (an API key, a gateway): leave those out.
    const noLimits = (await read($, repliedAtom)) && reading.rateLimits.length === 0
    const compact = await read($, compactAtom)

    // Context first, then the 5-hour and the 7-day window.
    const build = (cells: number, short: boolean): [string, Row][] => [
      ['ctx ', contextRow(reading.context, compact?.at ?? undefined, cells, short)],
      ...(noLimits
        ? []
        : ([
            ['5h ', windowRow('5h', limit('five_hour'), now, cells, short)],
            ['7d ', windowRow('7d', limit('seven_day'), now, cells, short)],
          ] as [string, Row][])),
    ]
    // Off the terminal the reported width is a placeholder that even changes (VS Code said 50, then
    // about 70): the band is one Text at a fixed level, the spaces inside a segment non-breaking, so
    // the surface breaks only between segments, at its real width. The terminal reports its true
    // width, so there rows are packed and squeezed here.
    const flow = e.surface !== 'terminal'
    const keep = (s: string) => (flow ? s.replace(/ /g, NBSP) : s)
    const segment = (i: number, [label, r]: [string, Row]) => [
      i > 0 ? ' '.repeat(GAP) : '',
      <Text key={`l${i}`} dimColor>{keep(label)}</Text>,
      <Text key={`b${i}`} color={COLOR[r.level]} dimColor={r.level === 'neutral'}>
        {r.bar}
      </Text>,
      <Text key={`t${i}`} color={r.level === 'red' ? COLOR.red : undefined} dimColor={r.state !== 'live'}>
        {keep(` ${r.text}`)}
      </Text>,
    ]

    // On the terminal, bars and text squeezed only as far as the width needs, in as few rows as it
    // takes; one Text per row, so a row that still wraps wraps whole.
    const fitted = flow ? null : fit(build, e.props.bodyColumns)
    const segments = fitted ? fitted.segments : build(FLOW_CELLS, false)
    const rows = fitted ? fitted.rows : [segments.map((_, i) => i)]
    return (
      <Box flexDirection="column">
        {rest}
        {rows.map((row, ri) => (
          <Box key={`row${ri}`}>
            <Text>{row.flatMap((si, j) => segment(j, segments[si]!))}</Text>
          </Box>
        ))}
      </Box>
    )
  })
}
