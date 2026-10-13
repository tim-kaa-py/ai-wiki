import { expect, mock, test } from 'claude-code/testing'
import type { Engine } from 'claude-code/testing'
import type { On, TurnCompleteInput } from 'claude-code'

import { bandParts } from './hooks/register'

const NOW = Date.UTC(2026, 9, 12, 15, 42)
const URL = 'https://www.youtube.com/watch?v=VQyYzLJ6xos'
const SLUG = '2026-10-05_robonuggets_anthropic-just-revealed-10-new-rules-for-claude-skills'
const BAND = {
  component: 'AbovePrompt',
  props: { hasSurvey: false, isWorking: false, maxRows: 3, bodyColumns: 200, scroll: { offset: 0, bodyRows: 3 }, view: {} },
} as const

// Tool results as the session saw them during the RoboNuggets ingest.
function answer(e: { tool: string; command?: string; description?: string }): string {
  if (e.command?.includes('--skip-download')) {
    return 'Anthropic Just Revealed 10 NEW Rules for Claude Skills|||Jay E | RoboNuggets|||20261005|||VQyYzLJ6xos|||12:15'
  }
  if (e.command?.includes('extract-transcript')) {
    return 'Error downloading subtitles: HTTP Error 429: Too Many Requests\nno_captions None None 0'
  }
  if (e.tool === 'Agent') {
    return `Async agent launched successfully.\nagentId: ${e.description?.startsWith('Connect') ? 'a2222222222222222' : 'a1111111111111111'} (internal ID)`
  }
  return 'ok'
}

function world(on: On) {
  const clock = mock.clock(on, { now: NOW })
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('prompt.submit', ($, e) => ({ text: e.text }))
  on('turn.complete', ($, e) => ({ text: e.answer }))
  on('tool.call', ($, e) => ({ result: 'ok', text: answer(e as never) }))
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })
  return clock
}

const subagentDone = (agentId: string) =>
  ({ answer: 'report', durationMs: 60_000, reason: 'answer', isAborted: false, turnId: 's', agentId }) as TurnCompleteInput
const mainDone = { answer: 'Pick a letter per tension.', durationMs: 60_000, reason: 'answer', isAborted: false, turnId: 'm' } as TurnCompleteInput

async function bandText($: Engine): Promise<string> {
  const ui = await $.ui.mount({ plugin: 'mod-ingest-band', surface: 'terminal', ...BAND })
  const drawn = JSON.stringify(await ui.drawn())
  await ui.unmount()
  return drawn
}

test('follows an ingest from the skill call to its commit', async ($, on) => {
  const clock = world(on)
  await $.session.start({ cwd: '/repo', surface: 'terminal', isInteractive: true })

  await $.tool.call({ tool: 'Skill', skill: 'ingest', args: URL })
  await $.tool.call({ tool: 'Bash', command: `yt-dlp --skip-download --print "%(title)s|||%(channel)s" "${URL}"` })
  await $.tool.call({ tool: 'Bash', command: `python scripts/extract-transcript.py "${URL}" > /tmp/t.json` })
  await $.tool.call({ tool: 'Bash', command: `S=/tmp; SL=${SLUG}; cp "$S/$SL.md" sources/youtube/$SL.md && cp "$S/summary.md" summaries/$SL.md` })
  await $.tool.call({ tool: 'Agent', description: 'Confidentiality scan source+summary', prompt: 'scan', model: 'sonnet' })
  await $.tool.call({ tool: 'Agent', description: 'Connect pass 1: detect and merge', prompt: 'connect', model: 'opus' })
  await clock.advance(4 * 60_000)

  let text = await bandText($)
  expect(text).toContain('Anthropic Just Revealed 10 NEW Rules for Claude Skills (Jay E | RoboNuggets)')
  expect(text).toContain('✓ meta source summary')
  expect(text).toContain('✗ transcript')
  expect(text).toContain('▶ scan (sonnet 4m)')
  expect(text).toContain('▶ connect (opus 4m)')

  await $.turn.complete(subagentDone('a1111111111111111'))
  await $.turn.complete(subagentDone('a2222222222222222'))
  await $.turn.complete(mainDone)
  text = await bandText($)
  expect(text).toContain('✓ meta source summary scan connect')
  expect(text).toContain('⏸ your turn')
  expect(text).toContain('next: index, log, commit')

  await $.prompt.submit({ text: '1a' } as never)
  await $.tool.call({ tool: 'Bash', command: "python3 - <<'EOF'\np='index.md'; s=open(p).read(); open(p,'w').write(s)\nEOF" })
  await $.tool.call({ tool: 'Bash', command: 'git add index.md log.md && git commit -q -m "Ingest: RoboNuggets"' })
  text = await bandText($)
  expect(text).toContain('✓ Ingest committed')

  await $.prompt.submit({ text: 'next' } as never)
  const ui = await $.ui.mount({ plugin: 'mod-ingest-band', surface: 'terminal', ...BAND })
  expect(await ui.find({ text: /Ingest/ })).toBeUndefined()
})

test('a LinkedIn URL post (yt-dlp without the ingest skill) draws no band', async ($, on) => {
  world(on)
  await $.tool.call({ tool: 'Bash', command: `yt-dlp --skip-download --print "%(title)s" "${URL}"` })
  await $.tool.call({ tool: 'Bash', command: `python3 scripts/extract-transcript.py "${URL}" > /tmp/tx.json` })
  const ui = await $.ui.mount({ plugin: 'mod-ingest-band', surface: 'terminal', ...BAND })
  expect(await ui.find({ text: /Ingest/ })).toBeUndefined()
})

test('a narrow band clips the title, not the steps', () => {
  const live = {
    title: 'A very long video title that will not fit into a narrow terminal band at all',
    startedAt: NOW,
    steps: { metadata: 'done', summary: 'running' },
    agents: [{ toolUseId: 't', step: 'summary', model: 'opus', startedAt: NOW, isDone: false }],
    isWaiting: false,
    isClosed: false,
  } as const
  const parts = bandParts({ ...live, agents: [...live.agents], steps: { ...live.steps } }, NOW + 6 * 60_000, 120)
  expect(parts.focus).toBe('▶ summary (opus 6m)')
  expect(parts.lead).toContain('…')
  expect((parts.lead + parts.focus + parts.tail).length).toBeLessThanOrEqual(120)
})
