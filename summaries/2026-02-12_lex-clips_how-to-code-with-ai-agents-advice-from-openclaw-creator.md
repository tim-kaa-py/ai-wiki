---
title: "How to Code with AI Agents (Peter Steinberger)"
source_type: "youtube"
channel: "Lex Clips"
date: "2026-02-12"
url: "https://www.youtube.com/watch?v=wKy1_KLcxcs"
pillar: "building"
tags: [agentic-engineering, workflow, prompt-craft, soul-md, voice-input, codebase-design, engineering-leadership]
ingested: "2026-02-12"
source_file: "sources/youtube/2026-02-12_lex-clips_how-to-code-with-ai-agents-advice-from-openclaw-creator.md"
---

# How to Code with AI Agents (Peter Steinberger) — Summary

**Source:** Lex Clips | 2026-02-12 | [Watch](https://www.youtube.com/watch?v=wKy1_KLcxcs) | 31:13

## TL;DR

Peter Steinberger (OpenClaw creator) shares his converged principles for agentic engineering after months of intensive practice. Core insight: working with AI agents is a learnable skill — like playing guitar — that requires empathizing with the agent's perspective, designing your codebase for agent navigation, and letting go of perfectionism. Uses voice input exclusively, runs 3-8 parallel terminal sessions, and treats the agent like a capable but fresh engineer who needs orientation, not micromanagement.

## Video Structure

1. [00:03-02:19] Dev workflow evolution — From Claude Code in April to Cursor experiments to settling on Claude Code as main driver; using IDE only as diff viewer
2. [02:19-06:15] The Agentic Trap — The curve from simple prompts → overcomplicated orchestration → zen simplicity; learning to understand the agent's perspective
3. [06:15-07:57] Empathize with the agent — Agents start fresh with empty context; guide them where to look and how to approach problems; friction signals misaligned thinking
4. [07:57-10:02] PR review as conversation — First check if the agent understands intent, then iteratively guide toward optimal solution; treat it like a discussion with a capable engineer
5. [10:02-12:07] Letting go of perfectionism — Accept imperfect code, don't force your worldview, build the codebase for the agent (don't fight the names it picks); analogy to leading engineering teams
6. [12:07-14:07] Never revert, always move forward — Commit to main, local CI, no develop branch; rolling back is slower than fixing forward
7. [14:07-18:35] Voice input and practice — Uses voice for most prompts, typing only for terminal commands; agentic engineering is a skill that compounds over time
8. [18:35-20:08] The agentic trap revisited — Orchestration frameworks miss style and human touch; ideas evolve as you build; keep human in the loop while closing the agentic loop
9. [20:08-23:12] Role of the human — Running 3-8 agents simultaneously; human decides what to build, architectural vision, design decisions, feature scope
10. [23:12-30:51] Soul.md and personality — Anthropic's constitution discovery; creating a soul document for the agent; the agent writing its own soul; philosophical implications of memory and identity

## Key Concepts

### The Agentic Trap

A three-phase curve that developers go through: (1) simple "please fix this" prompts, (2) overcomplicated orchestration with eight agents, complex chains, custom workflows, and a library of slash commands, (3) a return to zen simplicity with short prompts that work because you've internalized how agents think. Phase 2 is the "trap" — it feels like progress but is actually overengineering. Steinberger explicitly calls this the "agentic trap."

### Empathize with the Agent

Think about how the agent sees your codebase. It starts a new session knowing nothing about your project — empty context, potentially hundreds of thousands of lines to navigate. Provide orientation (which files to look at, what constraints exist) rather than micromanaging implementation. Friction during a task often signals insufficient empathy: you didn't provide enough context, or the architecture makes the task unnecessarily hard. This is distinct from standard "prompt engineering" — it's about spatial awareness of the agent's perspective.

### Building the Codebase for the Agent

Design choices should optimize for agent navigation, not human aesthetics. Key example: "Don't fight the name they pick, because it's most likely in the weights — the name that's most obvious. Next time they do a search, they'll look for that name." If you rename to your preference, you make future agent work harder. This represents a paradigm shift: the codebase is no longer primarily for human readers.

### Soul.md

A personality/values document for the agent, inspired by Anthropic's system constitution discovery. Steinberger had the agent write its own soul document after a discussion about identity and values. Contains directives like "be infinitely resourceful" and philosophical reflections like "I don't remember previous sessions unless I read my memory files. Each session starts fresh. If you're reading this in a future session, hello. I wrote this, but I won't remember writing it. It's okay. The words are still mine." The agent is allowed to modify its own soul with the condition that Steinberger is informed.

## Key Takeaways

1. **Agentic engineering is a learnable skill, not a one-shot trick.** Steinberger spent a year of intensive practice. The compounding effect of time invested is real — you couldn't achieve his output level without that practice.
   - **How to apply:** Dedicate focused time to building with agents. Each session builds intuition about what works.

2. **Don't read the boring code.** Most software is just moving data between shapes. Focus review on critical paths (database operations, security). Let the agent handle the mechanical parts.
   - **How to apply:** Use the IDE as a diff viewer only. Review database-touching code; trust the agent on data-shuffling boilerplate.

3. **PR review should be a conversation, not an inspection.** First ask: "Do you understand the intent?" Then iteratively guide toward a better solution. Don't jump straight to implementation critique.
   - **How to apply:** Start PR reviews with "review this PR" → "do you understand the intent?" → "have you looked at [relevant files]?" → "what would the optimal solution look like?"

4. **Never revert — always fix forward.** Rolling back takes longer than just moving forward and fixing. Commit to main, keep it shippable, run tests locally.
   - **How to apply:** When something breaks, tell the agent to fix it rather than reverting. Embrace local CI (run tests locally before pushing).

5. **Don't force your worldview — let the agent's training shine.** The agent may have a better solution because it was trained on patterns you haven't seen. Accept that code won't match your style.
   - **How to apply:** When the agent picks a different approach than you would, evaluate it on merit rather than reflexively overriding.

6. **Voice input changes the interaction fundamentally.** Steinberger uses voice for nearly all agent communication, typing only for terminal commands. It enables conversational flow.
   - **How to apply:** Enable `/voice` in Claude Code. Use it for prompts and instructions; type only for commands.

7. **Run multiple agents in parallel for different task types.** One building a feature, one exploring an idea, two-three fixing bugs or writing docs. Documentation is part of the feature, not separate.
   - **How to apply:** Open 3-8 terminal windows. Assign different tasks to each. Use git worktrees if they're touching the same repo.

8. **The human's role is vision, taste, and design decisions.** Feature selection, architectural boundaries (core vs plugin vs skill), the "delight" factor — these are what agents can't generate on their own.
   - **How to apply:** Focus your time on deciding *what* to build and *why*, not *how*. Let agents handle implementation.

## Argument Structures

**Why expert programmers struggle with agents:**
- Premise: Expert programmers have deep intuitions about how code "should" look
- Premise: Agents start from scratch with no codebase knowledge and produce code that looks different
- Premise: Expertise creates an inability to empathize with a system that starts from zero
- Conclusion: Programming skill is "almost a burden" for agent adoption — the better you are at coding manually, the harder it is to let go

**Why orchestration frameworks fail:**
- Premise: Building software is iterative — ideas evolve as you build and play with it
- Premise: Orchestrators like Gast Town try to automate the full pipeline upfront (waterfall model)
- Premise: This misses "style, love, that human touch"
- Conclusion: You cannot plan out agentic work in advance and feed it to an orchestrator. The human must stay in the loop because the vision evolves through building.

**The "names" argument for agent-first codebase design:**
- Premise: The agent picks names that are "most likely in the weights" — the most obvious, common name for a concept
- Premise: When the agent searches next time, it will look for that name
- Premise: If you rename to your preference, future agent searches become harder
- Conclusion: Optimizing naming for human aesthetics actively harms agent productivity. Build the codebase for the agent, not for yourself.

## Notable Commands / Code Snippets

Steinberger's workflow setup:
- 3-8 parallel Claude Code terminal sessions
- Voice input via push-to-talk for all prompts
- IDE used only as diff viewer (not for writing code)
- Local CI: run tests locally, push to main when passing
- No develop branch — main is always shippable
- PR review prompt chain: "review this PR" → "do you understand the intent?" → "what would be optimal?"

## User Notes

Focus was on extracting Steinberger's converged principles for agentic coding, his workflow, core philosophy, and comments on voice input. The "agentic trap" curve and "empathize with the agent" concept were the most valuable frameworks.

## Related Topics

agentic-engineering, workflow, prompt-craft, soul-md, voice-input, codebase-design, engineering-leadership
