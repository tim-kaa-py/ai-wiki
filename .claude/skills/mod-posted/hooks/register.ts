import type { EngineInterface, Register } from 'claude-code'

// Every LinkedIn post ended the same way: the user typed "I posted it, commit
// and push it", and Claude flipped the post's status, deleted the paste-ready
// .txt and committed the private linkedin module by hand. /posted runs those
// steps without a model turn, as linkedin/CLAUDE.md prescribes; typing it is
// the user's ask to commit and push. --no-commit stops after the file changes.

const PLUGIN = 'mod-posted'
const STATUS = /^status:\s*"?(\w+)"?\s*$/m
const DRAFT_LINE = /^status:\s*"?draft"?\s*$/m
const TITLE = /^#\s+(?:LinkedIn Post\s+[—-]\s+)?(.+)$/m

type Draft = { slug: string; text: string; hasTxt: boolean }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'posted',
      description: 'Mark the open LinkedIn draft as posted: status, delete its .txt, commit and push linkedin/',
      argumentHint: '[slug] [--no-commit]',
    })

    return next(e)
  })

  on('command.run', { command: 'posted' }, async ($, e) => ({ text: await markPosted($, e.args) }))
}

async function markPosted($: EngineInterface, args: string): Promise<string> {
  const words = args.split(/\s+/).filter(Boolean)
  const isCommit = !words.includes('--no-commit')
  const wanted = words
    .find(word => !word.startsWith('--'))
    ?.replace(/^.*\//, '')
    .replace(/\.(md|txt)$/, '')

  const module = await findModule($)
  if (module === undefined) {
    return 'No linkedin/ module in this clone, so there is no post to mark (see docs/private-modules.md).'
  }

  const drafts = await openDrafts($, `${module}/posts`)
  const matching = wanted === undefined ? drafts : drafts.filter(draft => draft.slug.includes(wanted))
  const pick =
    matching.length === 1 ? matching[0] : onlyOne(matching.filter(draft => draft.hasTxt))
  if (pick === undefined) {
    if (matching.length === 0) {
      return wanted === undefined
        ? 'No LinkedIn post is in draft, so there is nothing to mark.'
        : `No draft matches "${wanted}". Open drafts:\n${slugs(drafts)}`
    }

    return `Several drafts are open; name one with /posted <slug>:\n${slugs(matching)}`
  }

  const path = `posts/${pick.slug}.md`
  await $.fs.write(`${module}/${path}`, setPosted(pick.text))
  if (pick.hasTxt) {
    await $.process.run(['rm', '-f', `${module}/posts/${pick.slug}.txt`])
  }
  const changed = `Marked ${pick.slug} as posted${pick.hasTxt ? ' and deleted its .txt' : ''}`
  if (!isCommit) {
    return `${changed}. Not committed (--no-commit).`
  }

  const day = (await $.process.run(['date', '+%Y-%m-%d'])).stdout.trim()
  const subject = `Post: ${TITLE.exec(pick.text)?.[1]?.trim() ?? pick.slug} (posted ${day})`
  const added = await git($, module, ['add', '--', path])
  const committed = added.exitCode === 0 ? await git($, module, ['commit', '-q', '-m', `${subject}\n\nMarked posted with /posted (${PLUGIN}).`, '--', path]) : added
  if (committed.exitCode !== 0) {
    return `${changed}, but the commit failed: ${firstLine(committed.stderr || committed.stdout)}`
  }
  const sha = (await git($, module, ['rev-parse', '--short', 'HEAD'])).stdout.trim()

  const remotes = (await git($, module, ['remote'])).stdout.trim()
  if (remotes === '') {
    return `${changed}, committed ${sha} ("${subject}"). No remote to push to.`
  }
  const pushed = await git($, module, ['push', '-q'])

  return pushed.exitCode === 0
    ? `${changed}, committed ${sha} ("${subject}") and pushed.`
    : `${changed}, committed ${sha}, but the push failed (not forced): ${firstLine(pushed.stderr || pushed.stdout)}`
}

async function findModule($: EngineInterface): Promise<string | undefined> {
  const cwd = (await $.session.cwd()).replace(/\/$/, '')
  for (const dir of [`${cwd}/linkedin`, ...(cwd.endsWith('/linkedin') ? [cwd] : [])]) {
    if ((await $.fs.exists(`${dir}/posts`)) && (await $.fs.exists(`${dir}/CLAUDE.md`))) {
      return dir
    }
  }

  return undefined
}

async function openDrafts($: EngineInterface, posts: string): Promise<Draft[]> {
  const entries = await $.fs.list(posts)
  const names = new Set(entries.map(entry => entry.name))
  const drafts: Draft[] = []
  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.md')) {
      continue
    }
    const text = await $.fs.read(`${posts}/${entry.name}`)
    if (STATUS.exec(frontmatter(text))?.[1] === 'draft') {
      const slug = entry.name.slice(0, -3)
      drafts.push({ slug, text, hasTxt: names.has(`${slug}.txt`) })
    }
  }

  return drafts
}

function frontmatter(text: string): string {
  if (!text.startsWith('---')) {
    return ''
  }
  const end = text.indexOf('\n---', 3)

  return end < 0 ? '' : text.slice(0, end)
}

function setPosted(text: string): string {
  const head = frontmatter(text)

  return head.replace(DRAFT_LINE, 'status: "posted"') + text.slice(head.length)
}

function git($: EngineInterface, module: string, argv: readonly string[]) {
  return $.process.run(['git', '-C', module, ...argv], { timeoutMs: 60_000 })
}

function onlyOne<T>(list: readonly T[]): T | undefined {
  return list.length === 1 ? list[0] : undefined
}

function slugs(drafts: readonly Draft[]): string {
  return drafts.map(draft => `  ${draft.slug}`).join('\n')
}

function firstLine(text: string): string {
  return text.trim().split('\n')[0] ?? ''
}
