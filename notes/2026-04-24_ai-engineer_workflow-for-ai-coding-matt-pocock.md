# Ingest Notes

**Source:** [Full Walkthrough: Workflow for AI Coding — Matt Pocock](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
**Re-ingest:** 2026-05-08 (replaces earlier 2026-05-07 hands-on-tactics ingest, removed by user request)

## User Focus

> "I care about the general dev workflow he presents — so the grill-me skill and then turn it into a PRD and then turn the PRD into a Kanban board and execute that with a loop. Also I care about the aspect of how to optimize the codebase architecture, and the concept of the dumb zone."

Three focus areas, in priority order:

### 1. The pipeline as a coherent workflow

The spine: **grill-me → PRD → Kanban → loop execution**. Capture each stage AND the handoff between stages — what artifact crosses each boundary, what the next stage consumes.

- **Grill-me** [0:12:17, 0:13:46, 0:15:48, 0:17:35, 0:19:15, 0:21:11, 0:25:25, 0:26:23, 0:27:48] — defense against "specs to code"; prompt body verbatim ("interview me relentlessly… one question at a time… provide your recommended answer"); 25K tokens of grilling history is the asset; alternative input = meeting transcript with domain expert; explicit human-in-the-loop boundary (cannot be Ralph-looped).
- **Grill-me → PRD handoff** [0:28:43, 0:29:38] — "destination doc + journey doc"; the 25K grill history feeds `/write-a-PRD`; do NOT clear context between grill and PRD.
- **PRD** [0:30:24, 0:32:31, 0:33:48, 0:35:14, 0:58:23] — `/write-a-PRD` skill; module list returned first (architecture handle inside the PRD); generated PRD has problem/solution/user-stories/implementation-decisions/testing-decisions; **Matt does NOT review the PRD** because he's already aligned via grilling and the LLM is reliable at summarization; out-of-scope section captures rejected options.
- **PRD → Kanban handoff** [0:39:38, 0:40:13] — sequential phase plan → only one agent can run; Kanban DAG → many can; first proposed split shows AFK ticket-tag.
- **Kanban** [0:41:18, 0:43:18, 0:49:25, 0:51:33] — Pragmatic Programmer "tracer bullets" / vertical slices, NOT horizontal phases (DB → API → frontend); `/PRD-to-issues` skill; pushback "the first slice is too horizontal" forces re-slicing; DAG with blocking relationships; explicit contrast with sequential plan.
- **Kanban → loop handoff** [0:52:00, 1:34:04] — verbatim: "It's at this point that the human leaves the loop." Day shift (planning) → night shift (AFK execution). Boundary = issues exist as local markdown files.
- **Loop execution (Ralph + Sandcastle)** [0:06:14, 0:53:14, 0:54:18, 0:56:00, 1:05:00, 1:11:50, 1:34:50, 1:29:50, 1:32:30] — Ralph Wiggum origin; `once.sh` shape (cat issues, last 5 commits, `claude --permission-mode accept-edits`); implementer prompt priority order (critical bugs > dev infra > traceable bullets > polish); reviewer requires fresh context; QA returns control to human and produces new Kanban tickets; Sandcastle = TS lib with worktree+Docker+planner+per-issue-implementer+merger; **Sonnet for impl, Opus for review**.

### 2. Optimizing codebase architecture

- **Shallow vs deep modules (Ousterhout)** [1:13:35, 1:16:54] — shallow = small files with cross-deps; AI cannot navigate the dependency graph and tests wrap every tiny function. Deep = small interface, lots of internal functionality; one test wraps the whole module.
- **PRD's module-map subsection** [1:18:13] — Matt names modules explicitly in every PRD (which are new deep modules, which existing modules get modified). Module map persists through planning AND implementation.
- **"Design interfaces yourself, delegate implementations"** [1:19:01] — answer to "do you know your codebase less now?" — modules become "gray boxes": you own shape and behavior, AI owns body. Way to retain code-base sense while moving fast.
- **`/improve-code-base-architecture` skill** [1:21:08, 1:32:45] — scans repo, proposes module clusters to deepen. Real example: video-editor module wrapped front-to-back as one deep module via discriminated union → AI "night and day" better at editing it. Verbatim: **"If you take one thing away from today, just try running this skill on your repo."** Skill output shape: clusters with coupling arguments, dependency category, gap notes ("zero tests = biggest gap").

### 3. The dumb zone

- **Origin and threshold** [0:03:00] — Dex Hardy's smart-zone/dumb-zone framing; ~100K tokens regardless of advertised window; quadratic attention is the mechanism.
- **Status line — exact tokens** [0:09:23] — verbatim: **"Essential information on every coding session because you need to know exactly how many tokens you're using so you know how close you are to the dumb zone. Absolutely essential."**
- **`/clear` vs `/compact`** [0:08:36] — clear returns to system prompt (Memento); compact creates "sediment" — non-deterministic. Devs love compact; Matt hates it.
- **1M-context counterpoint** [0:37:14] — verbatim: **"They shipped a lot more dumb zone."** Smart zone didn't grow; 1M is good for retrieval, not coding.
- **Dumb-zone tactics tied to the pipeline** [0:14:45, 1:05:00] — clear before grill-me so the system prompt is the only fixed cost; clear between implementer and reviewer so reviewer also runs in the smart zone.
- **System-prompt sizing** [0:07:38] — keep tiny; Matt has seen 250K-token system prompts that put the session in the dumb zone before any work begins.

## Confirmed Discoveries

User chose **B + C + E**:

- **B. Software engineering fundamentals work better with AI** [opening + closing] — Pragmatic Programmer / Brooks / Ousterhout. Explains why every pipeline stage cites a 20-year-old SWE concept. The reason the workflow is stable while tools churn.
- **C. Feedback-loop quality is the AI ceiling** [1:09:30] — verbatim: no feedback loops = AI codes blind. Ties TDD + deep modules + loop's run-tests step into one causal claim.
- **E. Don't keep PRDs in the repo (doc rot)** [1:23:13] — close/delete after implementation; doc rot misleads future agents. Includes unresolved migration-analog question (Matt: "I don't know").

User dropped **A** ("Own your planning stack") and **D** (sub-agent token economics).

### Anti-takeaways (kept by default)

- **[0:59:18] More code review under AI is unavoidable** — Matt admits he doesn't know how to reconcile "agents producing more code than humans can review" with "keep PRs small and self-contained." Verbatim: "I don't honestly know what the answer to this yet." Unsolved problem in his pipeline.
- **[1:24:40] PRD retention policy is unsettled** — when asked about migrations as the analog to deletable PRDs, Matt says "I don't know… let's talk about it afterwards." Caveat for the deletion claim in discovery E.
- **[1:26:04] Don't optimize the PRD AFK** — qualifies the "use deep-think to improve the PRD" suggestion. The place to put work is QA, not PRD polish. Hard limit on how far the destination doc should be pushed.
- **[0:48:55] Dropped earlier "concise grammar" tip** — Matt previously recommended a CLAUDE.md instruction to "sacrifice grammar for concision" so plans are readable; he has since dropped it because he no longer reads plans (grill-me replaced that need). Flag if any older Pocock material in the wiki cites it.
