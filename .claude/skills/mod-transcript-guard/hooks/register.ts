import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, ToolCallResult } from 'claude-code'

// YouTube ingests lose their transcript in a fixed pattern: the caption
// download comes back HTTP 429, the audio fallback HTTP 403. The 429 is not a
// short rate limit: from 2026-10 to 2026-11 YouTube refused script caption
// downloads from this network for days at a time, on and off, while Chrome
// still got the same captions. An old yt-dlp makes the 403 likely. This mod
// checks yt-dlp's age at session start, refuses an identical caption retry
// inside the cooldown, tells the model to move on to the skill's next
// fallback, and notifies the user the moment a paste or an upgrade is needed.
// It stays silent during /daily-ai-briefing: a briefing is discovery only and
// its skill marks a missing transcript and moves on, so steering it toward
// local transcription or a paste would cost time for nothing.

const ytdlp = atom({ plugin: 'mod-transcript-guard', key: 'ytdlp' } as const, null)
const limited = atom({ plugin: 'mod-transcript-guard', key: 'limited' } as const, null)
const notified = atom({ plugin: 'mod-transcript-guard', key: 'notified' } as const, [])
const briefing = atom({ plugin: 'mod-transcript-guard', key: 'briefing' } as const, false)

const PLUGIN = 'mod-transcript-guard'
const BRIEFING = /^\s*\/daily-ai-briefing\b/
const CAPTIONS = /scripts\/extract-transcript\.py/
const AUDIO = /scripts\/transcribe-audio\.py|transcribe\/scripts\/transcribe\.sh/
const VIDEO_ID = /(?:[?&]v=|youtu\.be\/|\/shorts\/|\/live\/)([\w-]{11})/
const RATE_LIMITED = /HTTP Error 429/
const BLOCKED = /HTTP Error 403|Sign in to confirm/
// The scripts retry a bot check over IPv4 on their own and print its text only
// when that retry fails too; no yt-dlp upgrade fixes it.
const BOT_CHECK = /Sign in to confirm/
const RELEASE = /^(\d{4})\.(\d{2})\.(\d{2})/
const COOLDOWN_MS = 6 * 60 * 60 * 1000
const STALE_DAYS = 60
const UPGRADE_DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000
const PASTE = "ask the user to paste the transcript (on YouTube: the ⋯ under the video, then Show transcript, then copy) and continue from it"
const NEXT_STEP = "Do not re-run the caption script and do not try to get around the block. Go on with the running skill's next fallback: linkedin-url-post reads the transcript panel in Chrome, ingest runs scripts/transcribe-audio.py once."

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const started = await next(e)
    $.clock.after(0, () => void checkYtDlp($))

    return started
  })

  on('prompt.submit', async ($, e, next) => {
    await update($, briefing, () => BRIEFING.test(e.text ?? ''))

    return next(e)
  }).catch(($, e, next) => next(e))

  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    const isCaptions = CAPTIONS.test(e.command)
    const isAudio = AUDIO.test(e.command)
    if ((!isCaptions && !isAudio) || (await read($, briefing))) {
      return next(e)
    }

    const videoId = e.command.match(VIDEO_ID)?.[1] ?? 'unknown'
    const now = await $.clock.now()
    const last = await read($, limited)
    if (isCaptions && last !== null && last.videoId === videoId && now - last.at < COOLDOWN_MS) {
      const minutes = Math.round((now - last.at) / 60_000)

      return {
        deny: `${PLUGIN}: YouTube refused the captions of this video (HTTP 429) ${minutes} min ago, and such a block usually lasts days. ${NEXT_STEP} If that fails too, ${PASTE}.`,
      }
    }

    const ran = await next(e)
    if (ran.deny !== undefined) {
      return ran
    }
    const text = ran.text ?? ''

    if (isCaptions && RATE_LIMITED.test(text)) {
      await update($, limited, () => ({ at: now, videoId }))

      return withContext(
        ran,
        `${PLUGIN}: YouTube refused the caption download (HTTP 429). This is not a short rate limit: YouTube refuses script caption downloads from this network for days at a time, while a real browser still gets them, and it clears on its own. ${NEXT_STEP} If that fails too, ${PASTE}.`,
      )
    }

    if ((isCaptions || isAudio) && BOT_CHECK.test(text)) {
      await tellUser($, videoId, false)

      return withContext(
        ran,
        `${PLUGIN}: YouTube's bot check ("Sign in to confirm you're not a bot") blocked this network, and the script's own IPv4 retry failed too. A yt-dlp upgrade does not fix a bot check, so do not suggest one and do not retry: ${PASTE}.`,
      )
    }

    if (isAudio && BLOCKED.test(text)) {
      const age = (await read($, ytdlp))?.ageDays
      const isOld = age !== undefined && age > UPGRADE_DAYS
      await tellUser($, videoId, isOld)

      return withContext(
        ran,
        isOld
          ? `${PLUGIN}: YouTube blocked the audio download (HTTP 403), and yt-dlp is ${age} days old, the usual cause. Do not retry yet: ask the user to approve "pip install -U yt-dlp" (never install it yourself), then retry the audio fallback once. If the user would rather not upgrade, ${PASTE}.`
          : `${PLUGIN}: YouTube blocked the audio download too (HTTP 403). Do not retry: ${PASTE}.`,
      )
    }

    return ran
  }).catch(($, e, next) => next(e))
}

async function checkYtDlp($: EngineInterface): Promise<void> {
  try {
    const run = await $.process.run(['yt-dlp', '--version'], { timeoutMs: 15_000 })
    const version = run.stdout.trim().split('\n').at(-1) ?? ''
    const match = version.match(RELEASE)
    if (run.exitCode !== 0 || match === null) {
      return
    }
    const released = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    const ageDays = Math.floor(((await $.clock.now()) - released) / DAY_MS)
    await update($, ytdlp, () => ({ version, ageDays }))
    if (ageDays > STALE_DAYS) {
      $.ui.toast(
        `yt-dlp ${version} is ${ageDays} days old; YouTube transcripts tend to fail past ~${STALE_DAYS} days. Upgrade before the next ingest: pip install -U yt-dlp`,
        { timeoutMs: 12_000 },
      )
    }
  } catch {
    // No yt-dlp on PATH: the ingest skill's own tooling check reports that.
  }
}

async function tellUser($: EngineInterface, videoId: string, isOld: boolean): Promise<void> {
  const told = await read($, notified)
  if (told.includes(videoId)) {
    return
  }
  await update($, notified, list => [...list, videoId])
  const text = isOld
    ? `YouTube blocked the transcript of ${videoId}. Approve a yt-dlp upgrade or paste the transcript.`
    : `YouTube blocked the transcript of ${videoId}. Paste it from YouTube's "Show transcript" panel.`
  const sent = await $.ui.notify(text, { title: 'ai-wiki ingest needs you' })
  if (!sent.isSent) {
    $.ui.toast(text, { timeoutMs: 12_000 })
  }
}

function withContext(ran: ToolCallResult<'Bash'>, note: string): ToolCallResult<'Bash'> {
  return ran.deny !== undefined ? ran : { ...ran, context: [...(ran.context ?? []), note] }
}
