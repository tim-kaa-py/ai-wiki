import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, ToolCallInput } from 'claude-code'

// The global Stop hook (~/.claude/hooks/commit-guard.sh) blocks a stop while
// the tree is dirty. Two situations in this repo make that block wrong:
//
// 1. Another live ai-wiki session is mid-ingest. The dirty files are its work,
//    not yet scanned or connected; committing them from here would publish
//    them unscanned in a public repo.
// 2. This session's own ingest is paused at a menu (focus letters, tension
//    choices) or waits on a background sub-agent. The ingest commits at its
//    end, after index and log.
//
// This mod sits above the settings hooks. It lets the guard run, then drops or
// narrows the guard's block. Whatever it cannot judge stays with the guard.

const PLUGIN = 'mod-commit-scope'
const touched = atom({ plugin: 'mod-commit-scope', key: 'touched' } as const, [])
const commands = atom({ plugin: 'mod-commit-scope', key: 'commands' } as const, [])
const isIngestActive = atom({ plugin: 'mod-commit-scope', key: 'isIngestActive' } as const, false)

const GUARD = 'Commit guard'
const LIVE_WINDOW_MS = 15 * 60 * 1000
const INGEST_SKILLS = new Set(['ingest', 'podcast-ingest', 'connect'])
const INGEST_PATH = /^(sources|summaries|notes)\//
const INGEST_SCRIPT = /scripts\/(extract-transcript|transcribe-audio)\.py/
const COMMIT = /\bgit\b[^\n|;&]*\bcommit\b/
// A Bash command counts as writing the paths it names only when it has one of
// these: a redirect, an in-place edit, a copy or move, a git add, or a Python
// open(..., 'w'). A read such as `grep id index.md` claims nothing.
const WRITES = /(^|[^0-9&>-])>{1,2}\s*(?!&|\/dev\/null)|\bsed\s+-i|\btee\b|\b(cp|mv|rm|touch)\s|\bgit\s+(add|mv|rm)\b|\.write\(|write_text\(|open\([^)]*,\s*['"][wa]/
const ASK = /\b(pick|choose|reply with|tell me (which|whether)|which (one|option|letters?|variant)|approve|confirm|your call)\b/i
const OPTION = /^(\*\*)?\(?([A-H]|[1-9][a-d]?)[.)]\s+\S/

type Tree = { dirty: string[]; ahead: number }

export const register: Register = on => {
  on('tool.call', async ($, e, next) => {
    await remember($, e)
    const ran = await next(e)
    if (e.tool === 'Bash' && COMMIT.test(e.command) && ran.deny === undefined && ran.isError !== true) {
      await update($, isIngestActive, () => false)
    }

    return ran
  }).catch(($, e, next) => next(e))

  on('classic.Stop', async ($, e, next) => {
    const result = await next(e)
    // The folded block names the hook first: "[~/.claude/hooks/commit-guard.sh]: Commit guard: ...".
    if (result.block?.includes(`${GUARD}:`) !== true) {
      return result
    }

    const tree = await inspect($, e.cwd)
    if (tree === undefined) {
      return result
    }

    const own = { touched: await read($, touched), commands: await read($, commands) }
    const claimed = tree.dirty.filter(path => isOwn(path, own))
    const unclaimed = tree.dirty.filter(path => !claimed.includes(path))
    const isOtherLive = unclaimed.length > 0 && (await isOtherSessionLive($, e.transcript_path))
    const parked = isOtherLive ? unclaimed : []
    const mine = isOtherLive ? claimed : tree.dirty
    const isPaused =
      (await read($, isIngestActive)) &&
      (asksForDecision(e.last_assistant_message ?? '') || (e.background_tasks?.length ?? 0) > 0)

    if (tree.ahead === 0 && (mine.length === 0 || isPaused)) {
      $.ui.toast(
        mine.length === 0
          ? `commit guard: left ${parked.length} path(s) to the other live ai-wiki session`
          : 'commit guard: ingest paused at a decision; it commits at its end',
      )
      const { block: _dropped, ...rest } = result

      return rest
    }

    if (parked.length === 0) {
      return result
    }

    return { ...result, block: narrowed(mine, tree.ahead, parked) }
  }).catch(($, e, next) => next(e))
}

async function remember($: EngineInterface, e: ToolCallInput): Promise<void> {
  if (e.tool === 'Write' || e.tool === 'Edit') {
    const path = relative(await $.session.cwd(), e.file_path)
    if (path === undefined) {
      return
    }
    await update($, touched, list => [...list, path].slice(-500))
    if (INGEST_PATH.test(path)) {
      await update($, isIngestActive, () => true)
    }
  } else if (e.tool === 'Bash') {
    if (INGEST_SCRIPT.test(e.command)) {
      await update($, isIngestActive, () => true)
    }
    if (writesFiles(e.command)) {
      await update($, commands, list => [...list, e.command.slice(0, 4000)].slice(-300))
    }
  } else if (e.tool === 'Skill' && INGEST_SKILLS.has(e.skill)) {
    await update($, isIngestActive, () => true)
  }
}

export function writesFiles(command: string): boolean {
  return WRITES.test(command)
}

async function inspect($: EngineInterface, root: string): Promise<Tree | undefined> {
  const status = await $.process.run(['git', 'status', '--porcelain', '-z'], { cwd: root, timeoutMs: 10_000 })
  if (status.exitCode !== 0) {
    return undefined
  }
  const ahead = await $.process.run(['git', 'rev-list', '--count', '@{u}..HEAD'], { cwd: root, timeoutMs: 10_000 })

  return {
    dirty: parsePorcelain(status.stdout),
    ahead: ahead.exitCode === 0 ? Number(ahead.stdout.trim()) || 0 : 0,
  }
}

// `git status --porcelain -z`: "XY path" entries split by NUL; a rename or copy
// is followed by one more entry, its old path.
export function parsePorcelain(out: string): string[] {
  const entries = out.split('\0').filter(Boolean)
  const paths: string[] = []
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i] ?? ''
    paths.push(entry.slice(3))
    if (/[RC]/.test(entry.slice(0, 2))) {
      i += 1
    }
  }

  return paths
}

export function isOwn(path: string, own: { touched: readonly string[]; commands: readonly string[] }): boolean {
  const bare = path.replace(/\/$/, '')
  const stem = (bare.split('/').at(-1) ?? bare).replace(/\.[^.]+$/, '')
  const isDir = path.endsWith('/')

  return (
    own.touched.some(written => written === bare || (isDir && written.startsWith(path))) ||
    own.commands.some(command => command.includes(bare) || (stem.length >= 12 && command.includes(stem)))
  )
}

export function asksForDecision(text: string): boolean {
  const lines = text
    .slice(-1500)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

  return (
    (lines.at(-1) ?? '').endsWith('?') ||
    lines.some(line => ASK.test(line)) ||
    lines.filter(line => OPTION.test(line)).length >= 2
  )
}

// Another session of this project counts as live when its transcript changed
// within the window; transcripts sit side by side in one folder.
async function isOtherSessionLive($: EngineInterface, transcriptPath: string): Promise<boolean> {
  const cut = transcriptPath.lastIndexOf('/')
  if (cut < 0) {
    return false
  }
  const self = transcriptPath.slice(cut + 1)
  try {
    const now = await $.clock.now()
    const entries = await $.fs.list(transcriptPath.slice(0, cut))

    return entries.some(
      entry =>
        entry.kind === 'file' &&
        entry.name.endsWith('.jsonl') &&
        entry.name !== self &&
        now - entry.mtimeMs < LIVE_WINDOW_MS,
    )
  } catch {
    return false
  }
}

function relative(root: string, path: string): string | undefined {
  const prefix = root.endsWith('/') ? root : `${root}/`
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length)
  }

  return path.startsWith('/') ? undefined : path
}

function narrowed(mine: readonly string[], ahead: number, parked: readonly string[]): string {
  const bullets = (paths: readonly string[], max: number) => [
    ...paths.slice(0, max).map(path => `  ${path}`),
    ...(paths.length > max ? [`  ... and ${paths.length - max} more`] : []),
  ]

  return [
    `${GUARD} (narrowed by ${PLUGIN}): commit at logical stopping points and push.`,
    ...(mine.length > 0 ? ['Uncommitted changes from this session:', ...bullets(mine, 20)] : []),
    ...(ahead > 0 ? [`${ahead} commit(s) not pushed to upstream.`] : []),
    `Leave these ${parked.length} path(s) alone: another live ai-wiki session is writing them and has not scanned or committed them. Stage your own paths by name, never with git add -A.`,
    ...bullets(parked, 10),
    'Commit and push your paths now, or tell the user in one line why they must stay uncommitted.',
  ].join('\n')
}
