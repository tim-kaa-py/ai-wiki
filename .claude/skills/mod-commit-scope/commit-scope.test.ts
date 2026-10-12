import { expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

import { asksForDecision, isOwn, parsePorcelain, writesFiles } from './hooks/register'

const ROOT = '/repo'
const TRANSCRIPTS = '/home/.claude/projects/repo'
const SELF = 'self.jsonl'
const NOW = 1_800_000_000_000
// As the engine folds the settings hook's exit 2: its command first, then its stderr.
const GUARD_BLOCK = '[/Users/me/.claude/hooks/commit-guard.sh]: Commit guard: the global rule is to commit at logical stopping points and push if a remote exists.'
const MENU = 'Two tensions found.\n\n1a. Keep both claims\n1b. Replace the old claim\n\nPick a letter per tension.'

type World = {
  porcelain: string
  ahead?: number
  otherSessionAgeMs?: number
}

// The world beneath the plugin: git, the transcript folder, the clock, and
// the global commit guard standing in as the settings hook.
function world(on: On, w: World): { toasts: string[] } {
  const toasts: string[] = []
  mock.clock(on, { now: NOW })
  on('session.cwd', () => ({ value: ROOT }))
  on('process.run', ($, e) => {
    const stdout = e.argv.includes('status') ? w.porcelain : `${w.ahead ?? 0}\n`
    return { value: { exitCode: 0, stdout, stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }
  })
  on('fs.list', () => ({
    value: [
      { name: SELF, kind: 'file', size: 1, mtimeMs: NOW },
      ...(w.otherSessionAgeMs === undefined
        ? []
        : [{ name: 'other.jsonl', kind: 'file' as const, size: 1, mtimeMs: NOW - w.otherSessionAgeMs }]),
    ],
  }))
  on('ui.toast', ($, e) => {
    toasts.push(e.text)
    return { value: undefined }
  })
  on('tool.call', () => ({ result: 'ok', text: 'ok' }))
  on('classic.Stop', () => ({ block: GUARD_BLOCK }))
  return { toasts }
}

const stop = { stop_hook_active: false, cwd: ROOT, transcript_path: `${TRANSCRIPTS}/${SELF}` }

test('drops the block when every dirty path belongs to another live session', async ($, on) => {
  const { toasts } = world(on, {
    porcelain: '?? sources/youtube/2026-10-05_robonuggets_rules.md\0 M wiki/concepts/agent-skills.md\0',
    otherSessionAgeMs: 60_000,
  })
  const result = await $.classic.Stop(stop)
  expect(result.block).toBeUndefined()
  expect(toasts[0]).toContain('left 2 path(s)')
})

test('keeps the block when no other session is live (orphaned work)', async ($, on) => {
  world(on, { porcelain: '?? notes/2026-10-05_x.md\0', otherSessionAgeMs: 60 * 60_000 })
  const result = await $.classic.Stop(stop)
  expect(result.block).toBe(GUARD_BLOCK)
})

test('narrows the block to this session’s paths when another session is live', async ($, on) => {
  world(on, {
    porcelain: ' M wiki/concepts/plan-and-review.md\0?? sources/youtube/2026-10-05_robonuggets_rules.md\0',
    otherSessionAgeMs: 30_000,
  })
  await $.tool.call({ tool: 'Edit', file_path: `${ROOT}/wiki/concepts/plan-and-review.md`, old_string: 'a', new_string: 'b' })
  const result = await $.classic.Stop(stop)
  expect(result.block).toContain('narrowed by mod-commit-scope')
  expect(result.block).toContain('Uncommitted changes from this session:\n  wiki/concepts/plan-and-review.md')
  expect(result.block).toContain('Leave these 1 path(s) alone')
  expect(result.block).toContain('  sources/youtube/2026-10-05_robonuggets_rules.md')
})

test('stays quiet while this session’s ingest waits on a menu, and guards again after its commit', async ($, on) => {
  world(on, { porcelain: '?? summaries/2026-10-05_robonuggets_rules.md\0' })
  await $.tool.call({ tool: 'Skill', skill: 'ingest', args: 'https://youtu.be/VQyYzLJ6xos' })
  await $.tool.call({ tool: 'Write', file_path: `${ROOT}/summaries/2026-10-05_robonuggets_rules.md`, content: 'x' })
  const paused = await $.classic.Stop({ ...stop, last_assistant_message: MENU })
  expect(paused.block).toBeUndefined()

  await $.tool.call({ tool: 'Bash', command: 'git add index.md && git commit -q -m "Ingest: x"' })
  const after = await $.classic.Stop({ ...stop, last_assistant_message: MENU })
  expect(after.block).toBe(GUARD_BLOCK)
})

test('passes the result through when the guard did not block, or another hook did', async ($, on) => {
  mock.clock(on, { now: NOW })
  let block: string | undefined
  on('classic.Stop', () => (block === undefined ? {} : { block }))
  expect((await $.classic.Stop(stop)).block).toBeUndefined()
  block = '[/hooks/tests.sh]: 3 tests fail'
  expect((await $.classic.Stop(stop)).block).toBe(block)
})

test('a read-only command claims nothing; a write claims the paths it names', () => {
  expect(writesFiles('grep -n "VQyYzLJ6xos" index.md')).toBe(false)
  expect(writesFiles('git status --short 2>/dev/null; wc -l log.md')).toBe(false)
  expect(writesFiles("python3 - <<'EOF'\np='index.md'; s=open(p).read(); open(p,'w').write(s)\nEOF")).toBe(true)
  const copy = 'SL=2026-10-05_robonuggets_rules; cp "$S/x.md" sources/youtube/$SL.md'
  expect(writesFiles(copy)).toBe(true)
  expect(isOwn('sources/youtube/2026-10-05_robonuggets_rules.md', { touched: [], commands: [copy] })).toBe(true)
  expect(isOwn('wiki/concepts/agent-skills.md', { touched: [], commands: [copy] })).toBe(false)
})

test('parses renames and spots menus', () => {
  expect(parsePorcelain('R  new.md\0old.md\0?? notes/a.md\0')).toEqual(['new.md', 'notes/a.md'])
  expect(asksForDecision(MENU)).toBe(true)
  expect(asksForDecision('Committed and pushed. Nothing is pending.')).toBe(false)
})
