// What mod-transcript-guard remembers about the session it runs in.
export type TranscriptGuardYtDlp = { version: string; ageDays: number }
export type TranscriptGuardLimit = { at: number; videoId: string }

declare module 'claude-code' {
  interface PluginState {
    'mod-transcript-guard': {
      // The installed yt-dlp release and its age, read at session start.
      ytdlp: TranscriptGuardYtDlp | null
      // The last caption download YouTube answered with HTTP 429.
      limited: TranscriptGuardLimit | null
      // Video ids the user was already told about.
      notified: string[]
      // True while the current prompt is /daily-ai-briefing, which handles a missing transcript itself.
      briefing: boolean
    }
  }
}
