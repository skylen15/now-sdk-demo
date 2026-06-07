---
name: sn-docs
description: "Use ServiceNow documentation sources in version-aware order: project-local docs, shared release clone, then Context7 CLI sources. Use when answering or implementing ServiceNow-related work, when user mentions ServiceNow docs/content/source-of-truth, or when a repo should use official ServiceNow documentation."
---

# ServiceNow Docs Source

## Quick Start

When ServiceNow facts matter, determine the documentation version first, then use the source order below before relying on memory or broad web search.

1. Determine release family/version:
   - Use the version explicitly named by the user.
   - If no version is explicit, use the current project's `AGENTS.md` default.
   - If no project default is available, default to `zurich`.
2. Search project-local docs first: `repos/servicenow-docs`.
3. If project-local docs are unavailable, search the shared release clone: `~/.local/share/servicenow-docs/{version}`.
4. If neither local source is available or sufficient, use Context7 CLI sources in this order:
   - `https://context7.com/websites/developer_servicenow?contextType=info`
   - `https://context7.com/websites/servicenowguru`
   - `https://context7.com/servicenowdevprogram/code-snippets`

The ServiceNowDocs `main` branch contains repository metadata. Product docs live on release branches such as `zurich`, `yokohama`, `xanadu`, and `australia`.

## Lookup Workflow

1. Determine the ServiceNow release family.
2. Check `repos/servicenow-docs` first and confirm it contains product docs, usually a `markdown/` tree and `llms.txt`.
3. Search exact terms with `rg` when available, then use `git grep`, `grep -R`, or PowerShell `Select-String` as fallbacks.
4. If project-local docs are unavailable, check `~/.local/share/servicenow-docs/{version}`.
5. If neither local source exists, clone the selected branch:

```sh
git clone --branch {version} --single-branch https://github.com/ServiceNow/ServiceNowDocs.git ~/.local/share/servicenow-docs/{version}
```

6. If exact-term search is insufficient, use semantic search over the selected local docs path when available.
7. If local docs remain insufficient, resolve and query Context7 with the globally installed `ctx7` CLI:

```sh
ctx7 library "ServiceNow" "<user question>"
ctx7 docs <libraryId> "<user question>"
```

8. Read nearby files, navigation files, examples, and related pages before answering.
9. Treat ServiceNowDocs trees as read-only reference material.
10. Cite local paths or Context7 source IDs used.

## Source Rules

- Prefer `repos/servicenow-docs` for ServiceNow documentation facts when present.
- Use `~/.local/share/servicenow-docs/{version}` when project-local docs are unavailable.
- Use Context7 third, preferring official developer documentation.
- Use non-official sources only as secondary context and label them as such.
- Never treat vendored docs as application code.
