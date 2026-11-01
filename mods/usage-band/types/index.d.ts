export type Limit = { kind: string; percentUsed: number; resetsAt?: string }

/** The engine's last measurement, as session.measure and $.session.usage() give it. */
export type Reading = {
  rateLimits: Limit[]
  context: { tokens?: number; window: number; percent?: number }
}

declare module 'claude-code' {
  interface PluginState {
    'usage-band': {
      reading: Reading | null
      /** Tokens at which auto-compaction runs, for the window it was read for; null when off or unread. */
      compact: { window: number; at: number | null } | null
      /** A reply has reported its figures: an empty rateLimits from then on means no subscription limits. */
      replied: boolean
    }
  }
}
