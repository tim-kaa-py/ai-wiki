// The band's figures, worked out from the engine's readings. Pure: no `$`, so the tests
// can hold every rule to a worked example.

export type Level = 'neutral' | 'green' | 'yellow' | 'red'

export type Row = {
  /** live: a current reading; reset: its reset time passed, no new reading yet; waiting: none yet. */
  state: 'live' | 'reset' | 'waiting'
  level: Level
  bar: string
  text: string
}

export type Limit = { percentUsed: number; resetsAt?: string }
export type Context = { tokens?: number; window: number; percent?: number }

const M = 60_000
const H = 60 * M
const D = 24 * H
const WINDOW_MS = { '5h': 5 * H, '7d': 7 * D } as const

/** Pace says nothing yet in the first tenth of a window: one busy turn would read as a run-out. */
const EARLY = 0.1
const RED_USED = 90
const CONTEXT_YELLOW = 0.75
const CONTEXT_RED = 0.9

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/** Whole minutes left, as a countdown reads: "42m", "2h 10m", past a day "4d 6h". */
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / M)
  if (minutes < 1) return '<1m'
  if (ms >= D) return `${Math.floor(ms / D)}d ${Math.floor((ms % D) / H)}h`
  if (ms >= H) return `${Math.floor(ms / H)}h ${minutes % 60}m`
  return `${minutes}m`
}

/** "850", "54k", "1M", "1.5M". */
export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`
  return String(n)
}

/** `fill` cells filled out of `cells`, the marker set between cells before cell `marker`. */
export function bar(fill: number, marker: number | undefined, cells: number): string {
  const chars: string[] = Array.from({ length: cells }, (_, i) => (i < fill ? '█' : '░'))
  if (marker !== undefined) chars.splice(clamp(marker, 0, cells), 0, '│')
  return chars.join('')
}

const cellsFor = (percent: number, cells: number) => clamp(Math.round((percent * cells) / 100), 0, cells)

/** `compact`: the short text a squeezed band uses ("72% 2h 0m out 1h 10m"). */
export function windowRow(kind: keyof typeof WINDOW_MS, limit: Limit | undefined, now: number, cells: number, compact = false): Row {
  const resetsAt = limit?.resetsAt ? Date.parse(limit.resetsAt) : NaN
  if (!limit || Number.isNaN(resetsAt)) {
    return { state: 'waiting', level: 'neutral', bar: bar(0, undefined, cells), text: 'no reading yet' }
  }
  const left = resetsAt - now
  if (left <= 0) {
    return { state: 'reset', level: 'neutral', bar: bar(0, undefined, cells), text: compact ? 'reset, refreshes on reply' : 'reset · updates after your next message' }
  }

  const length = WINDOW_MS[kind]
  const gone = clamp(length - left, 0, length)
  const timeShare = gone / length
  const used = limit.percentUsed
  const shown = Math.round(used)
  const parts = [formatDuration(left)]

  let level: Level = timeShare < EARLY ? 'neutral' : 'green'
  if (used >= 100) {
    level = 'red'
    parts.push('limit reached')
  } else if (timeShare >= EARLY && used > timeShare * 100) {
    // Over pace: at this window's rate so far, the rest of the quota lasts this long.
    const runOut = (100 - used) / (used / gone)
    level = runOut < left / 2 ? 'red' : 'yellow'
    parts.push(`${compact ? 'out' : 'out in'} ${formatDuration(runOut)}`)
  }
  if (used >= RED_USED) level = 'red'
  // Green and neutral: the bar says enough. Yellow: the run-out is the figure that matters. Red: the
  // bar's cells are too coarse to tell 85% from 97%, so the percent shows.
  if (level === 'red') parts.unshift(`${shown}%`)

  return {
    state: 'live',
    level,
    bar: bar(cellsFor(shown, cells), Math.round(timeShare * cells), cells),
    text: parts.join(compact ? ' ' : ' · '),
  }
}

/** Columns a segment takes: its label, its bar, a space and its text. */
export function segmentWidth(label: string, row: Row): number {
  return [...label].length + [...row.bar].length + 1 + [...row.text].length
}

/** Spaces between two segments in a row. */
export const GAP = 2

/** Segments, by width, in as few rows of `columns` as fit; a segment too wide for any row gets its own. */
export function pack(widths: number[], columns: number): number[][] {
  const rows: number[][] = []
  let used = 0
  widths.forEach((w, i) => {
    const row = rows[rows.length - 1]
    if (row && used + GAP + w <= columns) {
      row.push(i)
      used += GAP + w
    } else {
      rows.push([i])
      used = w
    }
  })
  return rows
}

export function contextRow(context: Context, compactAt: number | undefined, cells: number, compact = false): Row {
  const { tokens, window } = context
  if (tokens === undefined || !window) {
    return { state: 'waiting', level: 'neutral', bar: bar(0, undefined, cells), text: 'no reading yet' }
  }
  const percent = context.percent ?? Math.round((tokens / window) * 100)
  const limit = compactAt && compactAt > 0 ? compactAt : window
  const share = tokens / limit
  const level: Level = share >= CONTEXT_RED ? 'red' : share >= CONTEXT_YELLOW ? 'yellow' : 'green'
  const marker = compactAt && compactAt > 0 ? Math.round((compactAt / window) * cells) : undefined

  return {
    state: 'live',
    level,
    bar: bar(cellsFor(percent, cells), marker, cells),
    // Tokens, not a percent: compaction happens at a token count, and the bar shows the share.
    text: compact ? `${formatTokens(tokens)}/${formatTokens(window)}` : `${formatTokens(tokens)} / ${formatTokens(window)}`,
  }
}

/** The levels a band squeezes through, roomiest first. */
const LEVELS = [
  { cells: 8, compact: false },
  { cells: 6, compact: false },
  { cells: 6, compact: true },
  { cells: 4, compact: true },
] as const

export type Fit = { cells: number; compact: boolean; segments: [string, Row][]; rows: number[][] }

/** The roomiest level whose segments, built by `build`, take the fewest rows of `columns`. */
export function fit(build: (cells: number, compact: boolean) => [string, Row][], columns: number): Fit {
  let best: Fit | undefined
  for (const { cells, compact } of LEVELS) {
    const segments = build(cells, compact)
    const rows = pack(
      segments.map(([label, r]) => segmentWidth(label, r)),
      columns,
    )
    if (!best || rows.length < best.rows.length) best = { cells, compact, segments, rows }
  }
  return best!
}
