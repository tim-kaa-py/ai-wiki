---
title: "Obsidian"
type: "tool"
pillar: "building"
tags: [obsidian, knowledge-management, wiki, visualization, web-clipper]
sources:
  - "summaries/2026-04-07_sayed-developer_why-andrej-karpathy-abandoned-rag-claude-code-obsidian.md"
last_updated: "2026-04-09"
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
Renders the wiki as an interactive knowledge graph. Each markdown file is a node. Internal links (`[[page]]` or `[text](path)`) create edges. Makes connections between concepts visible at a glance.

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

## Related Pages

- [LLM Wiki Pattern](../concepts/llm-wiki-pattern.md) — the pattern Obsidian visualizes
- [Claude Code](claude-code.md) — the engine that maintains the wiki
