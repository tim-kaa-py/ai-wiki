// What mod-commit-scope remembers about the session it runs in.
export type CommitScopePaths = string[]

declare module 'claude-code' {
  interface PluginState {
    'mod-commit-scope': {
      // Repo-relative paths this session (or one of its sub-agents) wrote with Write or Edit.
      touched: CommitScopePaths
      // Bash commands of this session that write files, kept to match the paths they name.
      commands: string[]
      // True from the start of an ingest until its commit.
      isIngestActive: boolean
    }
  }
}
