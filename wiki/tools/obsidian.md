---
title: "Obsidian"
type: "tool"
pillar: "building"
tags: [obsidian, knowledge-management, wiki, visualization, web-clipper, self-documenting]
sources:
  - "summaries/2026-04-02_karpathy_llm-wiki.md"
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
  - "summaries/2026-04-06_cole-medin_self-evolving-claude-code-memory-karpathy-llm-knowledge.md"
last_updated: "2026-04-13"
---

# Obsidian

A markdown-based knowledge management tool that serves as the visualization frontend for the LLM wiki pattern. Free, local-first, works directly with markdown files on disk.

## Role in the Wiki Setup

Obsidian doesn't replace Claude Code — it complements it. Claude Code builds and maintains the wiki (the engine). Obsidian lets you browse, visualize, and navigate it (the dashboard).

| Component | Role |
|-----------|------|
| Claude Code | Ingests sources, maintains wiki pages, handles cross-references |
| Obsidian | Graph view, backlink navigation, visual browsing |
| Obsidian Web Clipper | Fast capture of web articles into inbox |

## Key Features for Wiki Use

### Graph View
Renders the wiki as an interactive knowledge graph. Each markdown file is a node. Internal links create edges. Makes connections between concepts, entities, and sources visible at a glance. In the sayed.developer demo, Instagram video scripts organized as wiki entities and concepts form a rich, navigable graph.

### Backlinks
Shows every page that links to the current page. Essential for seeing how a concept connects to others across the wiki.

### Web Clipper (Browser Extension)
Clips web pages (including images) directly into a designated folder as markdown. Zero-friction capture pipeline:
1. Find an interesting article
2. Click the clipper extension
3. "Add to Obsidian" → saved to `inbox/`
4. Tell Claude Code: "process inbox"

### Setup

1. Install Obsidian (free)
2. Open the wiki repo directory as a vault: Manage Vaults → Create → Browse to repo folder
3. Install Obsidian Web Clipper browser extension
4. Configure clipper output folder to the wiki's `inbox/` directory
5. The existing markdown structure with cross-references renders immediately as a navigable graph

### Useful Plugins (from Karpathy)

- **Dataview** — runs queries over page frontmatter. If wiki pages have YAML frontmatter (tags, dates, source counts), Dataview generates dynamic tables and lists.
- **Marp** — markdown-based slide deck format. Generate presentations directly from wiki content.

### Image Handling Tip

In Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. `sources/assets/`). Then bind "Download attachments for current file" to a hotkey (e.g. Ctrl+Shift+D). After clipping an article, hit the hotkey to download all images locally — prevents broken URL references over time. *(Source: Karpathy gist)*

## Self-Documenting Codebase Vault

Cole Medin extends Obsidian's role beyond external knowledge visualization to **internal codebase memory**. The approach: structure your Claude Code memory system as an Obsidian vault so the same graph view, backlinks, and navigation tools work for your session logs and wiki entries.

The vault contains:
- **Daily logs** — session summaries captured automatically by Claude Code hooks
- **Wiki entries** — concepts and connections promoted from logs by a flush process
- **Index files** — LLM-maintained navigation that agents read at session start

Clone the repo, open it as a vault, and the entire self-documenting codebase is immediately browsable with Obsidian's full feature set. *(Source: Cole Medin)*

## Related Pages

- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) — the pattern Obsidian visualizes
- [Claude Code](claude-code.md) — the engine that maintains the wiki
- [Andrej Karpathy](../people/andrej-karpathy.md) — originator of the pattern
- [Claude Code Hooks for Memory](../how-tos/claude-code-hooks-memory.md) — the hook system that feeds the vault
