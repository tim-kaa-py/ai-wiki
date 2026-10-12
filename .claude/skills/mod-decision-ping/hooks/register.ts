import type { EngineInterface, Register } from 'claude-code'

// Ingests and LinkedIn drafts here end long turns on a menu: focus letters,
// tension resolutions, post variant 1 or 2. Those menus often sat unanswered
// for 10 to 90 minutes. When a turn of the main loop ran long enough that the
// user has likely looked away, this mod sends a native notification naming
// the decision, or a done note after a very long turn without one.

const MIN_TURN_MS = 90 * 1000
const DONE_TURN_MS = 5 * 60 * 1000
const MAX_CHARS = 140
const ASK = /\b(pick|choose|reply with|tell me (which|whether)|which (one|option|letters?|variant)|approve|confirm|your call)\b/i
const OPTION = /^(\*\*)?\(?([A-H]|[1-9][a-d]?)[.)]\s+\S/

export const register: Register = on => {
  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (e.agentId !== undefined || e.reason !== 'answer' || e.durationMs < MIN_TURN_MS) {
      return result
    }

    const decision = decisionLine(e.answer)
    if (decision !== undefined) {
      await ping($, `Your call: ${decision}`)
    } else if (e.durationMs >= DONE_TURN_MS) {
      await ping($, `Done after ${Math.round(e.durationMs / 60_000)} min: ${clip(plain(firstLine(e.answer)))}`)
    }

    return result
  })
}

// The line that asks: the last line that ends in a question mark or uses a
// decision verb; failing that, a count of the options a menu lists.
export function decisionLine(answer: string): string | undefined {
  const lines = answer
    .slice(-1500)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
  const asking = [...lines].reverse().find(line => line.endsWith('?') || ASK.test(line))
  if (asking !== undefined) {
    return clip(plain(asking))
  }
  const options = lines.filter(line => OPTION.test(line)).length

  return options >= 2 ? `pick one of ${options} options` : undefined
}

async function ping($: EngineInterface, text: string): Promise<void> {
  const sent = await $.ui.notify(text, { title: 'ai-wiki' })
  if (!sent.isSent) {
    $.ui.toast(text, { timeoutMs: 15_000 })
  }
}

function firstLine(text: string): string {
  return text.split('\n').find(line => line.trim() !== '')?.trim() ?? ''
}

function plain(line: string): string {
  return line.replace(/[*_`#>]/g, '').replace(/^[-•]\s+/, '').replace(/\s+/g, ' ').trim()
}

function clip(text: string): string {
  return text.length > MAX_CHARS ? `${text.slice(0, MAX_CHARS - 1)}…` : text
}
