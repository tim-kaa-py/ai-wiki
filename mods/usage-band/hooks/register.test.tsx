import { expect, mock, test } from 'claude-code/testing'

const NOW = 1_800_000_000_000
const M = 60_000
const H = 60 * M
const at = (ms: number) => new Date(NOW + ms).toISOString()
const PROPS = { isWorking: false, hasSurvey: false, maxRows: 10, bodyColumns: 100 } as never

type Files = Record<string, string>
type On = Parameters<NonNullable<Parameters<typeof test>[2]>>[1]

/** Every $ call the mod makes, answered as the engine would; `files` is the fake disk. */
function setup(on: On, files: Files = {}) {
  on('session.start', async ($, e) => ({ cwd: (e as { cwd: string }).cwd }) as never)
  on('env.get', async () => ({ value: '/home/test' }) as never)
  on('fs.exists', async ($, e) => ({ value: (e as { path: string }).path in files }) as never)
  on('fs.read', async ($, e) => ({ value: files[(e as { path: string }).path] ?? '' }) as never)
  on('session.usage', async ($, e) =>
    (e as { breakdown?: string }).breakdown
      ? ({ value: { context: { window: 1_000_000, breakdown: { autoCompactThreshold: 800_000 } }, rateLimits: [] } } as never)
      : ({ value: { context: { window: 1_000_000 }, rateLimits: [] } } as never),
  )
  on('session.measure', async ($, e) => ({ changed: (e as { changed: string[] }).changed }) as never)
  // Another mod's band beneath this one: it must stay drawn.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>OTHER BAND</Text>
  })
  return mock.clock(on, { now: NOW })
}

const measure = (rateLimits: unknown[], tokens = 54_000) => ({
  context: { tokens, window: 1_000_000, percent: Math.round(tokens / 10_000) },
  rateLimits,
  changed: ['context', 'rateLimits'],
})

const LIMITS = [
  { kind: 'five_hour', percentUsed: 72, resetsAt: at(2 * H) },
  { kind: 'seven_day', percentUsed: 14, resetsAt: at(4 * 24 * H + 6 * H) },
]

for (const surface of ['terminal'] as const) {
  test(`draws the three rows under the other bands (${surface})`, { timeoutMs: 30000 }, async ($, on) => {
    const clock = setup(on)
    await $.session.start({ source: 'startup', cwd: '/repo', surface, isInteractive: true } as never)
    await $.session.measure(measure(LIMITS) as never)
    await clock.settle()

    const ui = await $.ui.mount({ plugin: 'usage-band', surface, component: 'AbovePrompt', props: PROPS })
    expect(await ui.find({ type: 'Text', text: /OTHER BAND/ }), 'other bands kept').toBeDefined()
    // 22 + 2 + 34 + 2 + 18 = 78 columns: one row of 100, context first; the yellow 5h shows its run-out, no percent.
    expect(
      await ui.find({ type: 'Text', text: /^ctx ░░░░░░│░░ 54k \/ 1M {2}5h █████│█░░ 2h 0m · out in 1h 10m {2}7d █░░│░░░░░ 4d 6h$/ }),
      'one row, the compaction marker at 80%',
    ).toBeDefined()
  })
}

test('the one-minute tick moves the countdown between turns', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'terminal', isInteractive: true } as never)
  await $.session.measure(measure(LIMITS) as never)
  await clock.settle()
  await clock.advance(10 * M)

  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'terminal', component: 'AbovePrompt', props: PROPS })
  expect(await ui.find({ type: 'Text', text: /5h .* 1h 50m · out in/ }), '10 minutes later').toBeDefined()
})

test('a reset that passed while idle says so', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'terminal', isInteractive: true } as never)
  await $.session.measure(measure(LIMITS) as never)
  await clock.settle()
  await clock.advance(2 * H + M)

  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'terminal', component: 'AbovePrompt', props: PROPS })
  expect(await ui.find({ type: 'Text', text: /5h .*reset · updates after your next message/ }), 'honest reset').toBeDefined()
  expect(await ui.find({ type: 'Text', text: /7d .*4d 3h/ }), '7d unaffected').toBeDefined()
})

test('before the first reply the rows wait; after a reply without limits only ctx stays', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'terminal', isInteractive: true } as never)
  await clock.settle()

  let ui = await $.ui.mount({ plugin: 'usage-band', surface: 'terminal', component: 'AbovePrompt', props: PROPS })
  expect(await ui.find({ type: 'Text', text: /^ctx .*no reading yet {2}5h .*no reading yet {2}7d .*no reading yet$/ }), 'all three wait, in one row').toBeDefined()

  await $.session.measure(measure([]) as never)
  await clock.settle()
  ui = await $.ui.mount({ plugin: 'usage-band', surface: 'terminal', component: 'AbovePrompt', props: PROPS })
  expect(await ui.find({ type: 'Text', text: /^5h / }), 'no 5h row without limits').toBeUndefined()
  expect(await ui.find({ type: 'Text', text: /7d / }), 'no 7d without limits').toBeUndefined()
  expect(await ui.find({ type: 'Text', text: /^ctx .*54k \/ 1M$/ }), 'ctx stays').toBeDefined()
})

test('switched off in /mods, it draws nothing of its own', async ($, on) => {
  const clock = setup(on, { '/home/test/.claude/mods/switches.json': '{ "usage-band": false }' })
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'vscode', isInteractive: true } as never)
  await $.session.measure(measure(LIMITS) as never)
  await clock.settle()

  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'vscode', component: 'AbovePrompt', props: PROPS })
  expect(await ui.find({ type: 'Text', text: /OTHER BAND/ }), 'other bands kept').toBeDefined()
  expect(await ui.find({ type: 'Text', text: /^ctx / }), 'no rows').toBeUndefined()
})

test('a narrow terminal packs into two rows', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'terminal', isInteractive: true } as never)
  const limits = [
    { kind: 'five_hour', percentUsed: 14, resetsAt: at(3 * H + 8 * M) },
    { kind: 'seven_day', percentUsed: 17, resetsAt: at(2 * 24 * H + 4 * H) },
  ]
  await $.session.measure(measure(limits, 295_000) as never)
  await clock.settle()

  // At 40 no level fits one row (level 4: 17 + 2 + 14 + 2 + 14 = 49); level 1 takes two:
  // ctx (23) alone, then 5h and 7d (18 each): 18 + 2 + 18 = 38.
  const props = { isWorking: false, hasSurvey: false, maxRows: 10, bodyColumns: 40 } as never
  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'terminal', component: 'AbovePrompt', props })
  expect(await ui.find({ type: 'Text', text: /^5h .*3h 8m {2}7d .*2d 4h$/ }), 'row 2: 5h and 7d').toBeDefined()
  expect(await ui.find({ type: 'Text', text: /^ctx .*295k \/ 1M$/ }), 'row 1: ctx').toBeDefined()
})
test('a 50-column terminal squeezes the screenshot figures into one row', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'terminal', isInteractive: true } as never)
  const limits = [
    { kind: 'five_hour', percentUsed: 21, resetsAt: at(2 * H + 56 * M) },
    { kind: 'seven_day', percentUsed: 18, resetsAt: at(2 * 24 * H + 4 * H) },
  ]
  await $.session.measure(measure(limits, 330_000) as never)
  await clock.settle()

  const props = { isWorking: false, hasSurvey: false, maxRows: 10, bodyColumns: 50 } as never
  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'terminal', component: 'AbovePrompt', props })
  // Level 4 (4 cells, short text): 17 + 2 + 15 + 2 + 14 = 50. ctx fill round(1.32) = 1, marker round(3.2) = 3;
  // 5h fill 1, marker round(1.65) = 2; 7d fill round(0.72) = 1, marker round(2.76) = 3.
  expect(await ui.find({ type: 'Text', text: /^ctx █░░│░ 330k\/1M {2}5h █░│░░ 2h 56m {2}7d █░░│░ 2d 4h$/ }), 'one row').toBeDefined()
})
// Off the terminal the reported width is a placeholder (VS Code always says 50), so the band is one
// Text: segments joined by plain spaces, the spaces inside a segment non-breaking. The surface then
// breaks only between segments, at its real width.
const NB = ' '
const seg = (s: string) => s.replace(/ /g, NB)

for (const surface of ['vscode', 'desktop'] as const) {
  test(`off the terminal the band is one flow the surface wraps between segments (${surface})`, { timeoutMs: 30000 }, async ($, on) => {
    const clock = setup(on)
    await $.session.start({ source: 'startup', cwd: '/repo', surface, isInteractive: true } as never)
    await $.session.measure(measure(LIMITS) as never)
    await clock.settle()

    const ui = await $.ui.mount({ plugin: 'usage-band', surface, component: 'AbovePrompt', props: PROPS })
    expect(await ui.find({ type: 'Text', text: /OTHER BAND/ }), 'other bands kept').toBeDefined()
    // Off the terminal always 6-cell bars and full text, whatever width is reported (here 100):
    // ctx fill round(0.3) = 0, marker round(4.8) = 5; 5h fill round(4.32) = 4, marker round(3.6) = 4;
    // 7d fill round(0.84) = 1, marker round(2.36) = 2.
    const row = await ui.find({ type: 'Text', text: /^ctx.*1M/ })
    expect(row?.text).toBe(
      [seg('ctx ░░░░░│░ 54k / 1M'), seg('5h ████│░░ 2h 0m · out in 1h 10m'), seg('7d █░│░░░░ 4d 6h')].join('  '),
    )
    // A segment's own label Text starts with "5h" too; a row of its own would carry its figures.
    expect(await ui.find({ type: 'Text', text: /^5h.*1h 10m/ }), 'no row of its own').toBeUndefined()
  })
}

test('off the terminal at the reported 50 columns: 6-cell bars, still one flow', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'vscode', isInteractive: true } as never)
  const limits = [
    { kind: 'five_hour', percentUsed: 21, resetsAt: at(2 * H + 56 * M) },
    { kind: 'seven_day', percentUsed: 18, resetsAt: at(2 * 24 * H + 4 * H) },
  ]
  await $.session.measure(measure(limits, 330_000) as never)
  await clock.settle()

  const props = { isWorking: false, hasSurvey: false, maxRows: 10, bodyColumns: 50 } as never
  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'vscode', component: 'AbovePrompt', props })
  // Level 2: ctx fill round(1.98) = 2, marker round(4.8) = 5.
  const row = await ui.find({ type: 'Text', text: /^ctx.*1M/ })
  expect(row?.text).toBe(
    [seg('ctx ██░░░│░ 330k / 1M'), seg('5h █░│░░░░ 2h 56m'), seg('7d █░░░│░░ 2d 4h')].join('  '),
  )
})

test('off the terminal a changing reported width does not change the level', async ($, on) => {
  const clock = setup(on)
  await $.session.start({ source: 'startup', cwd: '/repo', surface: 'vscode', isInteractive: true } as never)
  const limits = [
    { kind: 'five_hour', percentUsed: 27, resetsAt: at(2 * H + 43 * M) },
    { kind: 'seven_day', percentUsed: 19, resetsAt: at(2 * 24 * H + 4 * H) },
  ]
  await $.session.measure(measure(limits, 386_000) as never)
  await clock.settle()

  // VS Code reported 50 once and about 70 later; at 70 the terminal rule would pick the short text.
  const props = { isWorking: false, hasSurvey: false, maxRows: 10, bodyColumns: 70 } as never
  const ui = await $.ui.mount({ plugin: 'usage-band', surface: 'vscode', component: 'AbovePrompt', props })
  const row = await ui.find({ type: 'Text', text: /^ctx.*1M/ })
  // 5h at 6 cells: fill round(1.62) = 2, marker round(2h 17m / 5h * 6 = 2.74) = 3.
  expect(row?.text).toContain(seg('ctx ██░░░│░ 386k / 1M'))
  expect(row?.text).toContain(seg('5h ██░│░░░ 2h 43m'))
})
