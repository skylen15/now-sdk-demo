# ServiceNow Documentation Skill

Use ServiceNow-specific sources before relying on memory.

- Use `now-sdk-explain` for Fluent, Now SDK project structure, metadata conventions, artifact types, SDK commands, and ServiceNow application development guidance.
- Use `sn-docs` for ServiceNow platform behavior, product docs, API docs, release-specific details, and implementation facts.
- Use the `australia` ServiceNow release by default for this project unless the user explicitly names another release.
- Treat `repos/servicenow-docs/` as the project-local read-only ServiceNow documentation source.

## Useful `now-sdk-explain` starting topics:

- `developing-apps-guide`
- `fluent-overview`
- `module-guide`
- `test-api`
- `atf-guide`
- `ui-page-guide`
- `ui-page-patterns-guide`
- `ui-page-theming-guide`

## Fallback

Use `now-sdk-setup` only when `now-sdk-explain` or `npx @servicenow/sdk` fails because of an environment setup problem, such as missing Node.js, unsupported Node.js, or unavailable SDK package.
