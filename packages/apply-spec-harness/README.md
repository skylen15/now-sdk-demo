# @kobidev/apply-spec-harness

Apply a portable, spec-driven development harness to an existing Node.js project.

```sh
npx @kobidev/apply-spec-harness@latest . --dry-run
npx @kobidev/apply-spec-harness@latest .
npx @kobidev/apply-spec-harness@latest . --preset servicenow-now-sdk
npx apply-spec-harness@latest . --preset servicenow-now-sdk --servicenow-release yokohama
npx apply-spec-harness@latest . --preset servicenow-now-sdk --without-tanstack-router
npx apply-spec-harness@latest . --preset servicenow-now-sdk --without-tanstack-query
```

In an interactive terminal, running without `--preset` prompts for `generic` or `servicenow-now-sdk`. Non-interactive runs default to `generic`. The generic preset installs the current harness structure with starter project-specific placeholders. The ServiceNow preset prompts for the instance release and defaults to `zurich`. It then adds ServiceNow Now SDK rules and review skills and clones reference repositories into `repos/`:

- [ServiceNow/ServiceNowDocs](https://github.com/ServiceNow/ServiceNowDocs) at the selected release branch into `repos/servicenow-docs`
- [skylen15/now-sdk-mock](https://github.com/skylen15/now-sdk-mock) `main` into `repos/now-sdk-mock`
- [microsoft/playwright](https://github.com/microsoft/playwright) `main` into `repos/playwright`
- [TanStack/router](https://github.com/TanStack/router) `main` into `repos/tanstack-router`
- [TanStack/query](https://github.com/TanStack/query) `main` into `repos/tanstack-query`

Interactive ServiceNow installs ask separately whether to include TanStack Router and TanStack Query; each defaults to yes. For non-interactive installation, use the separate `--with-tanstack-router`, `--without-tanstack-router`, `--with-tanstack-query`, or `--without-tanstack-query` options. Pass `--servicenow-release` to select the docs branch, otherwise it defaults to `zurich`. The reference repositories are cloned after installation and are not included in the npm package. Existing files and repositories are preserved unless `--force` is supplied; existing reference checkouts are always preserved.
