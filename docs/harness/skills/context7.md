# Context7 Documentation Skill

Use the `ctx7` CLI to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage.

Do not use Context7 for refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Workflow

1. Resolve the library first:

   ```powershell
   ctx7@latest library <name> "<user's question>"
   ```

2. Pick the best `/org/project` match by exact name, description relevance, snippet count, source reputation, and benchmark score.
3. Fetch docs:

   ```powershell
   ctx7@latest docs <libraryId> "<user's question>"
   ```

4. Answer using the fetched documentation.

For version-specific docs, use the versioned library ID when available. Do not include sensitive information in Context7 queries. If Context7 fails with a quota error, tell the user and suggest `ctx7@latest login` or setting `CONTEXT7_API_KEY`.
