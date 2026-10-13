import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, ToolCallInput, ToolCallResult } from 'claude-code'

import type { IngestAgent, IngestRun, IngestStep } from '../types'

// An ingest runs for many minutes, much of it inside Opus and Sonnet
// sub-agents (summary, scan, CONNECT), and the only way to see where it stood
// was to ask or to read the recap. This band shows the pipeline in one line
// above the prompt: steps done, the sub-agent working and for how long, and
// when the ingest waits on the user. It reads the session's own tool calls;
// it never changes them.

const run = atom({ plugin: 'mod-ingest-band', key: 'run' } as const, null)
const tick = atom({ plugin: 'mod-ingest-band', key: 'tick' } as const, 0)

const ORDER: readonly IngestStep[] = ['metadata', 'transcript', 'source', 'focus', 'summary', 'scan', 'connect', 'index', 'log', 'commit']
const LABEL: Record<IngestStep, string> = {
  metadata: 'meta',
  transcript: 'transcript',
  source: 'source',
  focus: 'focus',
  summary: 'summary',
  scan: 'scan',
  connect: 'connect',
  index: 'index',
  log: 'log',
  commit: 'commit',
}
const START_SKILLS = new Set(['ingest'])
const URL = /https?:\/\/\S+/
const METADATA = /yt-dlp\s+--skip-download\s+--print/
const TRANSCRIPT = /scripts\/(extract-transcript|transcribe-audio)\.py/
const TRANSCRIPT_FAILED = /HTTP Error \d{3}|no_captions|"status":\s*"error"/
const COMMIT = /\bgit\b[^\n|;&]*\bcommit\b/
const WRITES = /(^|[^0-9&>-])>{1,2}\s*(?!&|\/dev\/null)|\bsed\s+-i|\btee\b|\b(cp|mv|touch)\s|\.write\(|write_text\(|open\([^)]*,\s*['"][wa]/
const SOURCE_PATH = /(^|[\s"'/])sources\//
// Most specific first: "Confidentiality scan source+summary" is a scan.
const AGENT_STEPS: readonly (readonly [RegExp, IngestStep])[] = [
  [/scan|confidential/i, 'scan'],
  [/connect|tension/i, 'connect'],
  [/focus|discovery/i, 'focus'],
  [/summar/i, 'summary'],
]
const PATH_STEPS: readonly (readonly [RegExp, IngestStep])[] = [
  [SOURCE_PATH, 'source'],
  [/(^|[\s"'/])summaries\//, 'summary'],
  [/(^|[\s"'/])index\.md\b/, 'index'],
  [/(^|[\s"'/])log\.md\b/, 'log'],
]
const TICK_MS = 30_000

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const started = await next(e)
    $.clock.every(TICK_MS, () => void bump($))

    return started
  })

  on('prompt.submit', async ($, e, next) => {
    await update($, run, current => (current === null || current.isClosed ? null : { ...current, isWaiting: false }))

    return next(e)
  }).catch(($, e, next) => next(e))

  on('tool.call', async ($, e, next) => {
    await before($, e)
    const ran = await next(e)
    await after($, e, ran)

    return ran
  }).catch(($, e, next) => next(e))

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (e.agentId !== undefined) {
      await finishAgent($, e.agentId)
    } else {
      await update($, run, current => (current === null || current.isClosed ? current : { ...current, isWaiting: true }))
    }

    return result
  })

  on('classic.SubagentStop', async ($, e, next) => {
    const result = await next(e)
    await finishAgent($, e.agent_id)

    return result
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const current = await read($, run)
    if (e.props.hasSurvey || current === null) {
      return next(e)
    }
    await read($, tick)
    const parts = bandParts(current, await $.clock.now(), e.props.bodyColumns)
    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text dimColor wrap="truncate-end">{parts.lead}</Text>
        {parts.focus !== '' && <Text bold wrap="truncate-end">{parts.focus}</Text>}
        {parts.tail !== '' && <Text dimColor wrap="truncate-end">{parts.tail}</Text>}
      </Box>
    )
  })
}

async function before($: EngineInterface, e: ToolCallInput): Promise<void> {
  if (e.tool === 'Skill' && START_SKILLS.has(e.skill)) {
    const now = await $.clock.now()
    await update($, run, () => fresh(e.args?.match(URL)?.[0] ?? 'new source', now))

    return
  }
  if (e.tool === 'Write' && SOURCE_PATH.test(e.file_path)) {
    const now = await $.clock.now()
    await update($, run, current => (current === null || current.isClosed ? fresh('new source', now) : current))
  }

  const current = await read($, run)
  if (current === null || current.isClosed) {
    return
  }
  if (e.tool === 'Bash' && METADATA.test(e.command)) {
    await setStep($, 'metadata', 'running')
  } else if (e.tool === 'Bash' && TRANSCRIPT.test(e.command)) {
    await setStep($, 'transcript', 'running')
  } else if (e.tool === 'Skill' && e.skill === 'connect') {
    await setStep($, 'connect', 'running')
  } else if (e.tool === 'Agent') {
    const step = AGENT_STEPS.find(([pattern]) => pattern.test(e.description))?.[1]
    if (step === undefined) {
      return
    }
    const agent: IngestAgent = {
      toolUseId: e.tool_use_id ?? '',
      step,
      ...(e.model === undefined ? {} : { model: e.model }),
      startedAt: await $.clock.now(),
      isDone: false,
    }
    await update($, run, live => (live === null ? live : { ...live, agents: [...live.agents, agent], steps: { ...live.steps, [step]: 'running' } }))
  }
}

async function after($: EngineInterface, e: ToolCallInput, ran: ToolCallResult): Promise<void> {
  const current = await read($, run)
  if (current === null || current.isClosed || ran.deny !== undefined) {
    return
  }
  const text = ran.text ?? ''
  const isOk = ran.isError !== true

  if (e.tool === 'Bash') {
    if (METADATA.test(e.command)) {
      const fields = text.split('\n').find(line => line.includes('|||'))?.split('|||')
      await update($, run, (live): IngestRun | null =>
        live === null
          ? live
          : {
              ...live,
              title: fields === undefined ? live.title : `${fields[0]?.trim() ?? live.title} (${fields[1]?.trim() ?? '?'})`,
              steps: { ...live.steps, metadata: fields === undefined ? 'failed' : 'done' },
            },
      )
    } else if (TRANSCRIPT.test(e.command)) {
      await setStep($, 'transcript', isOk && !TRANSCRIPT_FAILED.test(text) ? 'done' : 'failed')
    } else if (COMMIT.test(e.command) && isOk) {
      await setStep($, 'commit', 'done')
      await update($, run, live => (live === null ? live : { ...live, isClosed: true, isWaiting: false }))
    } else if (isOk && WRITES.test(e.command)) {
      for (const [pattern, step] of PATH_STEPS) {
        if (pattern.test(e.command)) {
          await setStep($, step, 'done')
        }
      }
    }
  } else if ((e.tool === 'Write' || e.tool === 'Edit') && isOk) {
    for (const [pattern, step] of PATH_STEPS) {
      if (pattern.test(e.file_path)) {
        await setStep($, step, 'done')
      }
    }
  } else if (e.tool === 'Agent') {
    const agentId = text.includes('Async agent launched') ? text.match(/agentId:\s*([a-z0-9]+)/)?.[1] : undefined
    await update($, run, live => {
      if (live === null) {
        return live
      }
      const agents = live.agents.map(agent =>
        agent.toolUseId !== (e.tool_use_id ?? '') ? agent : agentId === undefined ? { ...agent, isDone: true } : { ...agent, agentId },
      )

      return settle({ ...live, agents })
    })
  }
}

async function finishAgent($: EngineInterface, agentId: string): Promise<void> {
  await update($, run, live => {
    if (live === null || !live.agents.some(agent => agent.agentId === agentId && !agent.isDone)) {
      return live
    }

    return settle({ ...live, agents: live.agents.map(agent => (agent.agentId === agentId ? { ...agent, isDone: true } : agent)) })
  })
}

// A step whose sub-agents have all finished is done.
function settle(live: IngestRun): IngestRun {
  const steps = { ...live.steps }
  for (const step of ORDER) {
    const mine = live.agents.filter(agent => agent.step === step)
    if (steps[step] === 'running' && mine.length > 0 && mine.every(agent => agent.isDone)) {
      steps[step] = 'done'
    }
  }

  return { ...live, steps }
}

// Marks a step; a step marked done also closes the running steps before it
// that have no sub-agent still at work (an inline skill such as connect).
async function setStep($: EngineInterface, step: IngestStep, state: 'running' | 'done' | 'failed'): Promise<void> {
  await update($, run, live => {
    if (live === null) {
      return live
    }
    const steps = { ...live.steps, [step]: state }
    if (state === 'done') {
      for (const earlier of ORDER.slice(0, ORDER.indexOf(step))) {
        const isBusy = live.agents.some(agent => agent.step === earlier && !agent.isDone)
        if (steps[earlier] === 'running' && !isBusy) {
          steps[earlier] = 'done'
        }
      }
    }

    return { ...live, steps }
  })
}

async function bump($: EngineInterface): Promise<void> {
  const current = await read($, run)
  if (current !== null && current.agents.some(agent => !agent.isDone)) {
    await update($, tick, n => n + 1)
  }
}

function fresh(title: string, now: number): IngestRun {
  return { title, startedAt: now, steps: {}, agents: [], isWaiting: false, isClosed: false }
}

export function bandParts(live: IngestRun, now: number, columns: number): { lead: string; focus: string; tail: string } {
  const at = (step: IngestStep) => live.steps[step]
  const done = ORDER.filter(step => at(step) === 'done').map(step => LABEL[step])
  const failed = ORDER.filter(step => at(step) === 'failed').map(step => LABEL[step])
  const running = ORDER.filter(step => at(step) === 'running')
  const busy = live.agents.filter(agent => !agent.isDone)
  const furthest = Math.max(-1, ...ORDER.map((step, i) => (at(step) === undefined ? -1 : i)))
  const upcoming = ORDER.slice(furthest + 1).map(step => LABEL[step])

  if (live.isClosed) {
    return { lead: `✓ Ingest committed · ${clip(live.title, columns - 22)}`, focus: '', tail: '' }
  }

  const minutes = (since: number) => {
    const m = Math.floor((now - since) / 60_000)
    return m < 1 ? '<1m' : `${m}m`
  }
  const working = running.map(step => {
    const agents = busy.filter(agent => agent.step === step)
    const who = agents.map(agent => `${agent.model ?? 'agent'} ${minutes(agent.startedAt)}`).join(', ')
    return `▶ ${LABEL[step]}${who === '' ? '' : ` (${who})`}`
  })
  const focus = [...working, ...(live.isWaiting && busy.length === 0 ? ['⏸ your turn'] : [])].join(' · ')
  const tail = upcoming.length > 0 ? `next: ${upcoming.join(', ')}` : ''
  const steps = [done.length > 0 ? `✓ ${done.join(' ')}` : '', failed.length > 0 ? `✗ ${failed.join(' ')}` : ''].filter(Boolean).join(' · ')
  const fixed = `Ingest ·  · ${steps}`.length + (focus === '' ? 0 : focus.length + 3) + (tail === '' ? 0 : tail.length + 3)
  const title = clip(live.title, Math.max(12, columns - fixed))

  return {
    lead: [`Ingest · ${title}`, steps].filter(Boolean).join(' · ') + (focus !== '' || tail !== '' ? ' · ' : ''),
    focus,
    tail: focus !== '' && tail !== '' ? ` · ${tail}` : tail,
  }
}

function clip(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, Math.max(1, max - 1))}…` : text
}
