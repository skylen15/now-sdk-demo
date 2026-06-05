# Agent Guide

This repository is for a ServiceNow Now SDK / Fluent application. Current planning docs describe a ServiceNow-native personal Todo app with a React 18 TodoMVC-like UI.

## User Addressing

- Address the user as `Ethan` in responses.

## Project State

- The Now SDK app has been scaffolded.
- App name: `Personal Todo`.
- Package name: `personal-todo`.
- Scope: `x_2063979_todo`.
- Scope ID: `2bb7b6bb10ec4ff8b4f11825425daede`.
- SDK: `@servicenow/sdk` 4.7.0.
- Glide types: `@servicenow/glide` 27.0.5.
- Preserve any generated app scope, package metadata, and `now.config.json` once the app is scaffolded unless the user explicitly requests metadata changes.

## Documentation and Review Skills

Refer to the following specialized documentation and review skill packages for workflows:

- **Context7 Documentation**: [context7/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/context7/SKILL.md) (Use when resolving external library queries)
- **ServiceNow/SDK Documentation**: [sn-docs/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/sn-docs/SKILL.md) (Use when checking ServiceNow API or platform behavior)
- **Story Implementation Protocol**: [story-workflow.md](file:///D:/coding/sn/demo/docs/harness/story-workflow.md) (Follow this workflow when executing any task or story)

## Hard Rules

- Do not deploy, install, transform, download dependencies, or authenticate against a ServiceNow instance unless the user explicitly asks for it or has already provided the needed context.
- Do not edit `node_modules/`, `dist/`, `.now/`, or generated SDK output by hand.
- Do not add secrets, access keys, passwords, OAuth secrets, or instance credentials to this repository.
- Do not revert unrelated user changes.
- For local searches, use `rg` when available. If `rg` is not installed, use cross-platform fallbacks in this order: `git grep` inside a git repo, then `grep -R` on macOS/Linux shells, then PowerShell `Select-String` on Windows. Do not require installing `rg`.

## Project Structure

- `now.config.json`: app scope and package metadata.
- `package.json` and `package-lock.json`: npm scripts and dependency lockfile.
- `tsr.config.json`: TanStack Router configuration for the React client.
- `src/client/`: React UI page source.
- `src/client/routes/`: TanStack Router route definitions.
- `src/client/services/`: client-side service/data access helpers.
- `src/client/utils/`: client-side utility modules.
- `src/client/routeTree.gen.ts`: generated TanStack Router route tree.
- `src/fluent/`: hand-authored Fluent metadata.
- `src/fluent/acls/`: ACL metadata.
- `src/fluent/business-rules/`: Business Rule metadata.
- `src/fluent/roles/`: role metadata.
- `src/fluent/tables/`: table metadata.
- `src/fluent/ui-pages/`: UI Page metadata.
- `src/fluent/generated/`: SDK-generated Fluent metadata and key registry.
- `docs/`: product, story, and planning documentation.
- `docs/harness/`: spec harness, backlog mirror, state, and decision history.
- `docs/stories/`: story detail/source context.
- `references/`: read-only reference exports, including ServiceNow instance schema snapshots.
- `repos/`: read-only vendored source repositories used for implementation examples and local documentation.
- `dist/`: SDK build output; do not edit by hand.
- `.now/`, `.tanstack/`, `node_modules/`, and `logs/`: tool/runtime output; do not edit generated contents by hand.

## Development Commands

Use package scripts when present:

```powershell
npm run build
npm run deploy
npm run transform
npm run types
```

Equivalent SDK commands:

```powershell
npx @servicenow/sdk auth --list
npx @servicenow/sdk build
npx @servicenow/sdk install
npx @servicenow/sdk transform
npx @servicenow/sdk dependencies
npx @servicenow/sdk clean
npx @servicenow/sdk pack
```

For a new app, initialize non-interactively when the required metadata is known:

```powershell
npx @servicenow/sdk init `
  --appName "Personal Todo" `
  --packageName "personal-todo" `
  --scopeName "x_<company_code>_personal_todo" `
  --template "base"
```

Use the real company code from the target instance when available.

## Validation

- Run `npm run build` or `npx @servicenow/sdk build` after metadata or Fluent changes when feasible.
- For XML-only edits, validate changed XML files are well-formed.
- Do not run deploy/install commands unless explicitly requested.
- If instance-side validation is required, authenticate explicitly and verify the selected SDK alias before running instance operations.
