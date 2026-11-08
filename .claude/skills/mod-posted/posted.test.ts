import { expect, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const ROOT = '/repo'
const POSTS = `${ROOT}/linkedin/posts`

const post = (status: string, title: string) =>
  `---\nsource_summary: "summaries/x.md"\nsource_url: "https://example.com"\ncreated: "2026-10-12"\nlanguage: "en"\nstatus: "${status}"\n---\n\n# LinkedIn Post — ${title}\n\n## Main Post\n\nstatus: "draft" in the body stays as it is.\n`

type World = {
  files: Record<string, string>
  hasModule?: boolean
  moduleDir?: string // where the linkedin module really is; default ROOT/linkedin
  env?: string // what `printenv LINKEDIN_MODULE` prints; unset when absent
  pushFails?: boolean
  remote?: string
}

function world(on: On, w: World) {
  const seen = { writes: {} as Record<string, string>, argv: [] as string[][] }
  const dir = w.moduleDir ?? `${ROOT}/linkedin`
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('command.register', ($, e) => ({ value: { command: e.name } }))
  on('session.cwd', () => ({ value: ROOT }))
  on('fs.exists', ($, e) => ({ value: w.hasModule !== false && (e.path === `${dir}/posts` || e.path === `${dir}/CLAUDE.md`) }))
  on('fs.list', () => ({
    value: Object.keys(w.files).map(name => ({ name, kind: 'file' as const, size: 1, mtimeMs: 0, isLink: false })),
  }))
  on('fs.read', ($, e) => ({ value: w.files[e.path.slice(`${dir}/posts`.length + 1)] ?? '' }))
  on('fs.write', ($, e) => {
    seen.writes[e.path] = e.text
    return { value: undefined }
  })
  on('process.run', ($, e) => {
    seen.argv.push([...e.argv])
    if (e.argv[0] === 'printenv') {
      const set = w.env !== undefined
      return { value: { exitCode: set ? 0 : 1, stdout: w.env ?? '', stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }
    }
    const verb = e.argv[0] === 'git' ? e.argv[3] : e.argv[0]
    const out = verb === 'date' ? '2026-10-12\n' : verb === 'rev-parse' ? 'abc1234\n' : verb === 'remote' ? (w.remote ?? 'origin\n') : ''
    const exitCode = verb === 'push' && w.pushFails === true ? 1 : 0
    const stderr = exitCode === 1 ? '! [rejected] main -> main (non-fast-forward)\n' : ''
    return { value: { exitCode, stdout: out, stderr, isStdoutTruncated: false, isStderrTruncated: false } }
  })
  return seen
}

async function posted($: { session: { start: Function }; command: { run: Function } }, args = ''): Promise<string> {
  await $.session.start({ cwd: ROOT, surface: 'terminal', isInteractive: true })
  const result = await $.command.run({ command: 'posted', args })
  return result.text
}

test('marks the one open draft, deletes its .txt, commits only that file and pushes', async ($, on) => {
  const seen = world(on, {
    files: {
      '2026-10-09_chase-ai_mods.md': post('posted', 'Mods intro'),
      '2026-10-12_robonuggets_rules.md': post('draft', 'Anthropic Just Revealed 10 NEW Rules for Claude Skills'),
      '2026-10-12_robonuggets_rules.txt': 'body',
    },
  })
  const text = await posted($ as never)
  expect(text).toBe(
    'Marked 2026-10-12_robonuggets_rules as posted and deleted its .txt, committed abc1234 ("Post: Anthropic Just Revealed 10 NEW Rules for Claude Skills (posted 2026-10-12)") and pushed.',
  )
  const written = seen.writes[`${POSTS}/2026-10-12_robonuggets_rules.md`] ?? ''
  expect(written).toContain('language: "en"\nstatus: "posted"\n---')
  expect(written).toContain('status: "draft" in the body stays as it is.')
  expect(seen.argv).toContainEqual(['rm', '-f', `${POSTS}/2026-10-12_robonuggets_rules.txt`])
  expect(seen.argv).toContainEqual(['git', '-C', `${ROOT}/linkedin`, 'add', '--', 'posts/2026-10-12_robonuggets_rules.md'])
  const commit = seen.argv.find(argv => argv[3] === 'commit') ?? []
  expect(commit.at(-1)).toBe('posts/2026-10-12_robonuggets_rules.md')
  expect(seen.argv.find(argv => argv[3] === 'push')).toEqual(['git', '-C', `${ROOT}/linkedin`, 'push', '-q'])
})

test('--no-commit changes the files and runs no git', async ($, on) => {
  const seen = world(on, { files: { 'a-post.md': post('draft', 'A'), 'a-post.txt': 'body' } })
  expect(await posted($ as never, '--no-commit')).toBe('Marked a-post as posted and deleted its .txt. Not committed (--no-commit).')
  expect(seen.argv.some(argv => argv[0] === 'git')).toBe(false)
})

test('with several drafts it asks for a slug, and a slug picks one', async ($, on) => {
  const seen = world(on, { files: { 'first-post.md': post('draft', 'One'), 'second-post.md': post('draft', 'Two') } })
  expect(await posted($ as never)).toBe('Several drafts are open; name one with /posted <slug>:\n  first-post\n  second-post')
  expect(Object.keys(seen.writes)).toEqual([])
  expect(await $.command.run({ command: 'posted', args: 'second --no-commit' } as never).then(r => r.text)).toBe(
    'Marked second-post as posted. Not committed (--no-commit).',
  )
})

test('a failed push is reported, never forced', async ($, on) => {
  const seen = world(on, { files: { 'a-post.md': post('draft', 'A') }, pushFails: true })
  expect(await posted($ as never)).toBe(
    'Marked a-post as posted, committed abc1234, but the push failed (not forced): ! [rejected] main -> main (non-fast-forward)',
  )
  expect(seen.argv.filter(argv => argv.includes('--force') || argv.includes('-f')).every(argv => argv[0] === 'rm')).toBe(true)
})

test('without the private module it explains and changes nothing', async ($, on) => {
  const seen = world(on, { files: {}, hasModule: false })
  expect(await posted($ as never)).toContain('No linkedin/ module in this clone')
  expect(seen.argv).toEqual([['printenv', 'LINKEDIN_MODULE']])
})

test('outside ai-wiki it finds the module through $LINKEDIN_MODULE', async ($, on) => {
  const elsewhere = '/work/workspace/linkedin'
  const seen = world(on, { files: { 'a-post.md': post('draft', 'A') }, moduleDir: elsewhere, env: `${elsewhere}\n` })
  expect(await posted($ as never, '--no-commit')).toBe('Marked a-post as posted. Not committed (--no-commit).')
  expect(Object.keys(seen.writes)).toEqual([`${elsewhere}/posts/a-post.md`])
})

test('a module under the working directory wins over $LINKEDIN_MODULE', async ($, on) => {
  const seen = world(on, { files: { 'a-post.md': post('draft', 'A') }, env: '/somewhere/else/linkedin\n' })
  expect(await posted($ as never, '--no-commit')).toBe('Marked a-post as posted. Not committed (--no-commit).')
  expect(Object.keys(seen.writes)).toEqual([`${POSTS}/a-post.md`])
  expect(seen.argv.some(argv => argv[0] === 'printenv')).toBe(false)
})
