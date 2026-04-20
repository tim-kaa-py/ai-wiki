---
title: "Effective harnesses for long-running agents"
source_type: "article"
channel: "Anthropic Engineering"
date: "2025-11-26"
url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"
pillar: "understanding"
tags: [harness-engineering, agents, long-running, claude, initializer-agent, testing, puppeteer]
ingested: "2026-04-20"
extraction_method: "web-fetch"
---

# Effective Harnesses for Long-Running Agents

**Published:** November 26, 2025
**Author:** Justin Young

---

## Article Summary

Anthropic researchers developed solutions enabling Claude to work effectively across multiple context windows on complex tasks. The core challenge: agents must work in discrete sessions with no memory of prior work.

### Two-Part Solution

The approach combines an **initializer agent** and **coding agent**:

- **Initializer Agent**: Sets up the foundational environment including an `init.sh` script, progress tracking file, and initial git commit
- **Coding Agent**: Makes incremental progress on single features while maintaining clean, documented code

### Key Environmental Components

**Feature Lists**: The initializer creates comprehensive JSON files with 200+ testable features marked as "failing," preventing premature project completion.

**Incremental Progress**: Agents work on one feature at a time, committing changes with descriptive messages rather than attempting large-scale implementations that exhaust context windows.

**Testing Protocol**: Claude uses browser automation tools (Puppeteer MCP) to verify features end-to-end as users would, dramatically improving bug detection compared to unit tests alone.

### Failure Modes Addressed

| Problem | Solution |
|---------|----------|
| Early victory declarations | Structured feature list with passing status |
| Undocumented progress | Git commits + progress file |
| Premature feature marking | Mandatory end-to-end testing |
| Runtime confusion | Pre-written `init.sh` startup script |

### Future Directions

Open questions remain regarding whether specialized multi-agent architectures (testing agents, QA agents) might outperform single general-purpose agents, and whether these findings generalize beyond web development to scientific research or financial modeling.
