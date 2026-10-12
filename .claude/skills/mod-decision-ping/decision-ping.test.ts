import { expect, test } from 'claude-code/testing'
import type { On, TurnCompleteInput } from 'claude-code'

import { decisionLine } from './hooks/register'

const TENSIONS = [
  'Summary and wiki merges are done. Two tensions need you:',
  '',
  '**1. harness-engineering.md** says X; the new source says Y.',
  '  1a. Keep both  1b. Replace  1c. Hold',
  '',
  'Pick a resolution per tension, e.g. "1a 2c".',
].join('\n')

function world(on: On, sent = true): { notes: string[]; toasts: string[] } {
  const seen = { notes: [] as string[], toasts: [] as string[] }
  on('turn.complete', ($, e) => ({ text: e.answer }))
  on('ui.notify', ($, e) => {
    seen.notes.push(e.text)
    return { value: sent ? { isSent: true, channel: 'iterm2' } : { isSent: false, reason: 'no-channel' } }
  })
  on('ui.toast', ($, e) => {
    seen.toasts.push(e.text)
    return { value: undefined }
  })
  return seen
}

function turn(answer: string, minutes: number, extra: Partial<TurnCompleteInput> = {}): TurnCompleteInput {
  return { answer, durationMs: minutes * 60_000, reason: 'answer', isAborted: false, turnId: 't1', ...extra } as TurnCompleteInput
}

test('a long turn ending on a menu pings with the question', async ($, on) => {
  const seen = world(on)
  await $.turn.complete(turn(TENSIONS, 6))
  expect(seen.notes).toEqual(['Your call: Pick a resolution per tension, e.g. "1a 2c".'])
})

test('a short turn, a sub-agent turn, or an interrupt stays quiet', async ($, on) => {
  const seen = world(on)
  await $.turn.complete(turn(TENSIONS, 1))
  await $.turn.complete(turn(TENSIONS, 6, { agentId: 'a1111111111111111' }))
  await $.turn.complete(turn(TENSIONS, 6, { reason: 'aborted', isAborted: true }))
  expect(seen.notes).toEqual([])
})

test('a very long turn without a question gets a done ping, by toast when notifications are unavailable', async ($, on) => {
  const seen = world(on, false)
  await $.turn.complete(turn('**Ingest complete.** Committed and pushed.\n\nNothing is pending.', 12))
  expect(seen.toasts).toEqual(['Done after 12 min: Ingest complete. Committed and pushed.'])
})

test('a lettered menu without a question still counts', () => {
  expect(decisionLine('Discoveries:\nA. Hooks as middleware\nB. Mods replace hooks\nC. Safety\n')).toBe('pick one of 3 options')
  expect(decisionLine('All done. The wiki is updated.')).toBeUndefined()
})
