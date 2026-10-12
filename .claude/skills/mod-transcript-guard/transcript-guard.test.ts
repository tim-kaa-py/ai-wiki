import { expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const NOW = Date.UTC(2026, 9, 12, 16, 0)
const URL = 'https://www.youtube.com/watch?v=VQyYzLJ6xos'
const CAPTIONS = `python scripts/extract-transcript.py "${URL}" > /tmp/t.json`
const AUDIO = `python scripts/transcribe-audio.py "${URL}" > /tmp/t.json`

type World = { version?: string; bashText: string; notifySent?: boolean }

function world(on: On, w: World) {
  const clock = mock.clock(on, { now: NOW })
  const seen = { toasts: [] as string[], notes: [] as string[], ran: 0 }
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('process.run', () => ({
    value: { exitCode: 0, stdout: `${w.version ?? '2026.08.19'}\n`, stderr: '', isStdoutTruncated: false, isStderrTruncated: false },
  }))
  on('ui.toast', ($, e) => {
    seen.toasts.push(e.text)
    return { value: undefined }
  })
  on('ui.notify', ($, e) => {
    seen.notes.push(e.text)
    return { value: w.notifySent === false ? { isSent: false, reason: 'disabled' } : { isSent: true, channel: 'iterm2' } }
  })
  on('tool.call', () => {
    seen.ran += 1
    return { result: { stdout: w.bashText, stderr: '', interrupted: false }, text: w.bashText }
  })
  return { clock, seen }
}

test('after a caption 429 it tells the model the fallback and refuses the same retry', async ($, on) => {
  const { clock, seen } = world(on, { bashText: 'Error downloading subtitles: HTTP Error 429: Too Many Requests\nno_captions None None 0' })
  const first = await $.tool.call({ tool: 'Bash', command: CAPTIONS })
  expect(first.context?.[0]).toContain('Do not re-run the caption script')

  const retry = await $.tool.call({ tool: 'Bash', command: CAPTIONS })
  expect(retry.deny).toContain('HTTP 429')
  expect(seen.ran).toBe(1)

  await clock.advance(11 * 60 * 1000)
  await $.tool.call({ tool: 'Bash', command: CAPTIONS })
  expect(seen.ran).toBe(2)
})

test('a 429 on one video does not refuse captions for another', async ($, on) => {
  const { seen } = world(on, { bashText: 'HTTP Error 429: Too Many Requests' })
  await $.tool.call({ tool: 'Bash', command: CAPTIONS })
  await $.tool.call({ tool: 'Bash', command: 'python scripts/extract-transcript.py "https://youtu.be/Rn4nmFRPe0s" > /tmp/b.json' })
  expect(seen.ran).toBe(2)
})

test('an old yt-dlp is flagged at session start and blamed for the audio 403', async ($, on) => {
  const { clock, seen } = world(on, { version: '2026.06.09', bashText: 'ERROR: unable to download video data: HTTP Error 403: Forbidden' })
  await $.session.start({ cwd: '/repo', surface: 'terminal', isInteractive: true })
  await clock.advance(0)
  expect(seen.toasts[0]).toContain('yt-dlp 2026.06.09 is 125 days old')

  const audio = await $.tool.call({ tool: 'Bash', command: AUDIO })
  expect(audio.context?.[0]).toContain('pip install -U yt-dlp')
  expect(seen.notes[0]).toContain('Approve a yt-dlp upgrade')

  await $.tool.call({ tool: 'Bash', command: AUDIO })
  expect(seen.notes.length).toBe(1)
})

test('with a fresh yt-dlp the audio 403 asks for a paste, by toast when notifications are off', async ($, on) => {
  const { clock, seen } = world(on, { version: '2026.10.01', bashText: 'HTTP Error 403: Forbidden', notifySent: false })
  await $.session.start({ cwd: '/repo', surface: 'terminal', isInteractive: true })
  await clock.advance(0)
  expect(seen.toasts.length).toBe(0)

  const audio = await $.tool.call({ tool: 'Bash', command: AUDIO })
  expect(audio.context?.[0]).toContain('paste the transcript')
  expect(seen.toasts[0]).toContain('Show transcript')
})

test('other commands pass through untouched', async ($, on) => {
  const { seen } = world(on, { bashText: 'HTTP Error 429' })
  const ran = await $.tool.call({ tool: 'Bash', command: 'grep -n "VQyYzLJ6xos" index.md' })
  expect(ran.context).toBeUndefined()
  expect(seen.ran).toBe(1)
})
