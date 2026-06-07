# @kobidev/apply-spec-harness

Apply a portable, spec-driven development harness to an existing Node.js project.

```sh
npx @kobidev/apply-spec-harness@latest . --dry-run
npx @kobidev/apply-spec-harness@latest .
npx @kobidev/apply-spec-harness@latest . --preset servicenow-now-sdk
npx apply-spec-harness@latest . --preset servicenow-now-sdk --servicenow-release yokohama
```

The generic preset installs the current harness structure with starter project-specific placeholders. In an interactive terminal, the ServiceNow preset prompts for the instance release and defaults to `zurich`. It then adds ServiceNow Now SDK rules and review skills and clones that release branch of [ServiceNow/ServiceNowDocs](https://github.com/ServiceNow/ServiceNowDocs) into `repos/servicenow-docs`.

For non-interactive installation, pass `--servicenow-release`; otherwise it defaults to `zurich`. The docs repository is cloned after installation and is not included in the npm package. Existing files and repositories are preserved unless `--force` is supplied; an existing ServiceNow docs checkout is always preserved.
