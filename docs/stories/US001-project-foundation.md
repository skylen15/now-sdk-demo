# US001 - Project Foundation

## User Story

As a developer, I want the ServiceNow Now SDK project foundation to be stable so that future Todo app metadata and UI work can be built, validated, and installed consistently.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 10. ServiceNow/Now SDK Build Plan, 11. Implementation Roadmap

## Scope

- Confirm the app scaffold exists for `Personal Todo`.
- Preserve generated app metadata.
- Keep project-local ServiceNow docs available at `repos/servicenow-docs`.
- Keep documentation and build commands aligned with the current project.

## Acceptance Criteria

- `now.config.json` exists and identifies the app as `Personal Todo`.
- `package.json` exists with Now SDK scripts for build, deploy/install, transform, and dependencies/types.
- Dependencies are installed or installable through `npm install`.
- `npm run build` completes successfully.
- `AGENTS.md` documents the current app metadata and project conventions.
- No instance deployment is required for this story.

## ServiceNow/Now SDK Notes

- Current scope: `x_2063979_todo`.
- Current package: `personal-todo`.
- Current SDK: `@servicenow/sdk` 4.7.0.
- Do not authenticate, install, deploy, transform, or download instance dependencies unless explicitly requested.

## Out of Scope

- Creating application tables.
- Creating UI pages.
- Adding runtime task behavior.
- Deploying to a ServiceNow instance.

## Testing

```powershell
npm run build
```

- Local build test: verify the Now SDK project builds without requiring deployment.
- Repository review: confirm `now.config.json`, `package.json`, `AGENTS.md`, and project metadata match the expected app name, package, and scope.
- No instance ATF or React UI smoke test is required for this foundation-only story.
