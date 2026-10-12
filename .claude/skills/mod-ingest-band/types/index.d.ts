// What mod-ingest-band tracks about the ingest under way in this session.
export type IngestStep = 'metadata' | 'transcript' | 'source' | 'focus' | 'summary' | 'scan' | 'connect' | 'index' | 'log' | 'commit'
export type IngestStepState = 'running' | 'done' | 'failed'
export type IngestAgent = {
  toolUseId: string
  agentId?: string
  step: IngestStep
  model?: string
  startedAt: number
  isDone: boolean
}
export type IngestRun = {
  title: string
  startedAt: number
  steps: Partial<Record<IngestStep, IngestStepState>>
  agents: IngestAgent[]
  isWaiting: boolean
  isClosed: boolean
}

declare module 'claude-code' {
  interface PluginState {
    'mod-ingest-band': {
      // The ingest under way, or the last one until the next prompt after its commit.
      run: IngestRun | null
      // Bumped every 30 s while a sub-agent works, so the band's minutes move.
      tick: number
    }
  }
}
