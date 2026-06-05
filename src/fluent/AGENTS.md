# Fluent Guide

## Fluent Conventions

- Define metadata in `.now.ts` files under `src/fluent/`.
- Organize hand-authored Fluent metadata by record/artifact type using kebab-case folders, for example `tables/`, `acls/`, `roles/`, `ui-pages/`, `business-rules/`, and `client-scripts/`.
- Create a folder for each metadata record type when adding more than one record of that type, or when the type is expected to grow. Keep one-off bootstrap metadata in a clearly named root file only when that is simpler.
- Put reusable server code under `src/server/`.
- Prefer TypeScript modules with `import` and `export` for server-side code when the artifact API accepts functions.
- In module files, import Glide APIs explicitly from `@servicenow/glide`.
- Do not assume every artifact supports module functions; some script fields require strings or `Now.include()`.
- Avoid manual edits under `generated/` unless intentionally repairing SDK mappings or generated-source drift.
- Commit or preserve SDK-required `generated/keys.ts` changes when builds/transforms legitimately change generated IDs, but avoid hand-editing it except for mapping repair.

## SDK Helper Reminders

- `Now.include(filePath)`: path is relative to the `.now.ts` file.
- `Now.attach(path)`: path is relative to the `.now.ts` file.
- `Now.ref(table, keysOrId, fallbackKeys?)`: use for existing platform records. For records defined in this Fluent project, prefer the exported record variable.
- `Now.ID[...]` resolves only in `$id`; do not put it directly in `Record().data` reference fields.
- Data helpers are global: `Duration(...)`, `Time(..., timeZone?)`, `TemplateValue<TTable>(...)`, and `FieldList<TTable>(...)`.
