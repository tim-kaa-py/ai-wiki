import { expect, test } from 'claude-code/testing'

import { bar, contextRow, fit, formatDuration, formatTokens, pack, segmentWidth, windowRow } from './usage'

// Expected values are worked out by hand from the rules, not from the code:
// time gone = window length - time to reset; over pace = used% > time gone%;
// run-out = (100 - used) / (used / time gone); red when run-out < half the time to reset or used >= 90.

const NOW = 1_800_000_000_000
const M = 60_000
const H = 60 * M
const D = 24 * H
const at = (ms: number) => new Date(NOW + ms).toISOString()
const CELLS = 15

test('formatDuration counts down in whole minutes, days and hours past a day', async () => {
  expect(formatDuration(59_999)).toBe('<1m')
  expect(formatDuration(M)).toBe('1m')
  expect(formatDuration(42 * M + 59_000)).toBe('42m')
  expect(formatDuration(H)).toBe('1h 0m')
  expect(formatDuration(2 * H + 10 * M)).toBe('2h 10m')
  expect(formatDuration(18 * H + 20 * M)).toBe('18h 20m')
  expect(formatDuration(D)).toBe('1d 0h')
  expect(formatDuration(4 * D + 6 * H + 59 * M)).toBe('4d 6h')
})

test('formatTokens shortens to k and M', async () => {
  expect(formatTokens(850)).toBe('850')
  expect(formatTokens(54_000)).toBe('54k')
  expect(formatTokens(54_321)).toBe('54k')
  expect(formatTokens(200_000)).toBe('200k')
  expect(formatTokens(1_000_000)).toBe('1M')
  expect(formatTokens(1_500_000)).toBe('1.5M')
})

test('bar puts the marker between cells, so the fill still counts as shown', async () => {
  expect(bar(5, 9, CELLS)).toBe('█████░░░░│░░░░░░')
  expect(bar(2, 6, CELLS)).toBe('██░░░░│░░░░░░░░░')
  expect(bar(0, undefined, CELLS)).toBe('░░░░░░░░░░░░░░░')
  expect(bar(15, 15, CELLS)).toBe('███████████████│')
})

test('5h under pace: green, the countdown alone (the bar shows the share)', async () => {
  // 34% used, 2h to reset: 3h of 5h gone = 60%. 34 < 60: under pace.
  // fill round(34 * 15 / 100 = 5.1) = 5; marker round(0.6 * 15) = 9.
  const r = windowRow('5h', { percentUsed: 34, resetsAt: at(2 * H) }, NOW, CELLS)
  expect(r.state).toBe('live')
  expect(r.level).toBe('green')
  expect(r.bar).toBe('█████░░░░│░░░░░░')
  expect(r.text).toBe('2h 0m')
})

test('5h slightly over pace: yellow, the run-out but no percent', async () => {
  // 72% in 3h = 24%/h; 28% left lasts 70 min; 70 >= 120 / 2: yellow.
  const r = windowRow('5h', { percentUsed: 72, resetsAt: at(2 * H) }, NOW, CELLS)
  expect(r.level).toBe('yellow')
  expect(r.text).toBe('2h 0m · out in 1h 10m')
})

test('5h well over pace: red when the run-out is under half the time to reset', async () => {
  // 80% in 3h = 26.67%/h; 20% left lasts 45 min; 45 < 60: red.
  const r = windowRow('5h', { percentUsed: 80, resetsAt: at(2 * H) }, NOW, CELLS)
  expect(r.level).toBe('red')
  expect(r.text).toBe('80% · 2h 0m · out in 45m')
})

test('90% used is red even under pace, with no run-out', async () => {
  // 20 min to reset: 4h40m of 5h gone = 93.3%. 91 < 93.3: under pace, but >= 90.
  const r = windowRow('5h', { percentUsed: 91, resetsAt: at(20 * M) }, NOW, CELLS)
  expect(r.level).toBe('red')
  expect(r.text).toBe('91% · 20m')
})

test('the limit reached says so', async () => {
  const r = windowRow('5h', { percentUsed: 100, resetsAt: at(H) }, NOW, CELLS)
  expect(r.level).toBe('red')
  expect(r.text).toBe('100% · 1h 0m · limit reached')
})

test('the first 10% of a window stays neutral, with no run-out and no percent', async () => {
  // 15 min of 5h gone = 5%. 8 > 5 would be over pace, but it is too early to tell.
  const r = windowRow('5h', { percentUsed: 8, resetsAt: at(4 * H + 45 * M) }, NOW, CELLS)
  expect(r.level).toBe('neutral')
  expect(r.text).toBe('4h 45m')
})

test('7d counts in days: marker and fill as worked out', async () => {
  // 4d 6h = 102h to reset; 66h of 168h gone = 39.3%; marker round(5.89) = 6; fill round(2.1) = 2.
  const r = windowRow('7d', { percentUsed: 14, resetsAt: at(4 * D + 6 * H) }, NOW, CELLS)
  expect(r.level).toBe('green')
  expect(r.bar).toBe('██░░░░│░░░░░░░░░')
  expect(r.text).toBe('4d 6h')
})

test('a reset that has passed shows an empty dim bar and why', async () => {
  const r = windowRow('5h', { percentUsed: 85, resetsAt: at(-M) }, NOW, CELLS)
  expect(r.state).toBe('reset')
  expect(r.level).toBe('neutral')
  expect(r.bar).toBe('░░░░░░░░░░░░░░░')
  expect(r.text).toBe('reset · updates after your next message')
})

test('no reading yet', async () => {
  const r = windowRow('7d', undefined, NOW, CELLS)
  expect(r.state).toBe('waiting')
  expect(r.text).toBe('no reading yet')
  expect(r.bar).toBe('░░░░░░░░░░░░░░░')
})

test('context: exact fill, a marker at the compaction point, tokens alone as text', async () => {
  // 54k of 1M = 5%; fill round(0.75) = 1; compaction at 800k = 80%: marker round(12) = 12.
  const r = contextRow({ tokens: 54_000, window: 1_000_000, percent: 5 }, 800_000, CELLS)
  expect(r.level).toBe('green')
  expect(r.bar).toBe('█░░░░░░░░░░░│░░░')
  expect(r.text).toBe('54k / 1M')
})

test('context colours by the way to compaction: yellow from 75%, red from 90%', async () => {
  // 640k / 800k = 80% of the way: yellow. 760k / 800k = 95%: red. 590k / 800k = 73.75%: green.
  expect(contextRow({ tokens: 640_000, window: 1_000_000, percent: 64 }, 800_000, CELLS).level).toBe('yellow')
  expect(contextRow({ tokens: 760_000, window: 1_000_000, percent: 76 }, 800_000, CELLS).level).toBe('red')
  expect(contextRow({ tokens: 590_000, window: 1_000_000, percent: 59 }, 800_000, CELLS).level).toBe('green')
})

test('context without auto-compaction: no marker, colours by the window', async () => {
  // 180k / 200k = 90%: red; no threshold, so no marker.
  const r = contextRow({ tokens: 180_000, window: 200_000, percent: 90 }, undefined, CELLS)
  expect(r.level).toBe('red')
  expect(r.bar).toBe('██████████████░')
  expect(r.text).toBe('180k / 200k')
})

test('context before the first reply', async () => {
  const r = contextRow({ window: 1_000_000 }, 800_000, CELLS)
  expect(r.state).toBe('waiting')
  expect(r.text).toBe('no reading yet')
})

test('every row reconciles: the filled cells match the percent, shown or not', async () => {
  // 3 days to reset: 4 of 7 days gone = 57.1%, 72h left. Over pace from 57.4 (yellow, no percent);
  // red once the run-out (100 - u) * 96h / u is under 36h, that is u > 72.7: the percent shows from 73.4.
  for (let used = 0; used <= 100; used += 1) {
    const r = windowRow('7d', { percentUsed: used + 0.4, resetsAt: at(3 * D) }, NOW, CELLS)
    const filled = [...r.bar].filter(c => c === '█').length
    expect(filled, `fill for ${used}%`).toBe(Math.round((used * CELLS) / 100))
    const shown = /^(\d+)%/.exec(r.text)?.[1]
    if (used >= 73) expect(Number(shown), `percent shown at ${used}`).toBe(used)
    else expect(shown, `no percent at ${used}`).toBeUndefined()
  }
})

test('the marker sits where the countdown says the window is', async () => {
  // 1h 30m to reset: 3h 30m of 5h gone = 70%; marker round(10.5)... use 1h 36m: 3h 24m = 68%, round(10.2) = 10.
  const r = windowRow('5h', { percentUsed: 1, resetsAt: at(H + 36 * M) }, NOW, CELLS)
  expect(r.text).toBe('1h 36m')
  expect(r.bar.indexOf('│')).toBe(10)
})

test('segmentWidth counts the label, the bar, a space and the text', async () => {
  // "5h " 3 + 8 cells and the marker 9 + 1 + "3h 8m" 5 = 18.
  const r = windowRow('5h', { percentUsed: 14, resetsAt: at(3 * H + 8 * M) }, NOW, 8)
  expect(r.text).toBe('3h 8m')
  expect(segmentWidth('5h ', r)).toBe(18)
})

test('pack fills rows greedily, two spaces between segments', async () => {
  // 24 + 2 + 24 + 2 + 29 = 81: one row at 100 columns.
  expect(pack([24, 24, 29], 100)).toEqual([[0, 1, 2]])
  // 24 + 2 + 24 = 50 fits the 50 columns VS Code reports; adding 2 + 29 does not.
  expect(pack([24, 24, 29], 50)).toEqual([[0, 1], [2]])
  // At 49, 50 no longer fits, and 24 + 2 + 29 = 55 neither.
  expect(pack([24, 24, 29], 49)).toEqual([[0], [1], [2]])
  // A segment wider than the band still gets its own row.
  expect(pack([60, 10], 50)).toEqual([[0], [1]])
})

test('short text drops the dots, "in" and the spaces around the slash', async () => {
  expect(windowRow('5h', { percentUsed: 72, resetsAt: at(2 * H) }, NOW, 4, true).text).toBe('2h 0m out 1h 10m')
  expect(windowRow('7d', { percentUsed: 14, resetsAt: at(4 * D + 6 * H) }, NOW, 4, true).text).toBe('4d 6h')
  expect(windowRow('5h', { percentUsed: 85, resetsAt: at(-M) }, NOW, 4, true).text).toBe('reset, refreshes on reply')
  expect(contextRow({ tokens: 54_000, window: 1_000_000, percent: 5 }, 800_000, 4, true).text).toBe('54k/1M')
})

// The VS Code screenshot's figures: 5h 21% with 2h 56m left, 7d 18% with 2d 4h left, ctx 330k of 1M.
const build = (cells: number, compact: boolean): [string, ReturnType<typeof windowRow>][] => [
  ['5h ', windowRow('5h', { percentUsed: 21, resetsAt: at(2 * H + 56 * M) }, NOW, cells, compact)],
  ['7d ', windowRow('7d', { percentUsed: 18, resetsAt: at(2 * D + 4 * H) }, NOW, cells, compact)],
  ['ctx ', contextRow({ tokens: 330_000, window: 1_000_000, percent: 33 }, 800_000, cells, compact)],
]

test('fit picks the roomiest level that needs the fewest rows: 50 columns', async () => {
  // All green, so no percent: 5h "2h 56m", 7d "2d 4h", ctx "330k / 1M" (short "330k/1M").
  // Level 1 (8 cells): 19 + 2 + 18 + 2 + 23 = 64. Level 2 (6): 17, 16, 21 = 58. Level 3: 17, 16, 19 = 56.
  // Level 4 (4 cells, short): 15 + 2 + 14 + 2 + 17 = 50: the only one row, so level 4 wins.
  const f = fit(build, 50)
  expect(f.cells).toBe(4)
  expect(f.compact).toBe(true)
  expect(f.rows).toEqual([[0, 1, 2]])
  // 5h: fill round(0.84) = 1, marker round(2h 04m / 5h * 4 = 1.65) = 2.
  expect(f.segments[0]![1].bar).toBe('█░│░░')
})

test('fit keeps the roomiest level when it already fits one row', async () => {
  // Level 1: 64 <= 100.
  const f = fit(build, 100)
  expect(f.cells).toBe(8)
  expect(f.rows).toEqual([[0, 1, 2]])
})

test('fit squeezes to one row when a smaller level gets there', async () => {
  // Level 1 needs 64, level 2 needs 58 <= 60: one row at level 2.
  const f = fit(build, 60)
  expect(f.cells).toBe(6)
  expect(f.compact).toBe(false)
  expect(f.rows).toEqual([[0, 1, 2]])
})
