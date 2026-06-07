# Technical Debt

## TD001 - Multiple Mutable Singletons

**Resolved:** Public synchronous `resetMockState()` clears `Database`, `PropertyDB`, `EventQueue`, `RESTDataStore`, scoped cache state, `SNTestEnvironment`, and restores Rhino globals while preserving singleton identities.

**Evidence:** `test/unit/ResetMockState.test.ts`; README isolation guidance.

## TD002 - Partial Platform Fidelity Is Distributed

Supported, simplified, and stubbed behaviors are discoverable across implementation, tests, and README rather than one compatibility reference.

**Resolved:** `docs/compatibility.md` classifies supported, simplified, no-op, and unsupported behavior and links contracts to focused tests.

## TD003 - Permissive TypeScript Configuration

**Resolved:** Production TypeScript uses `strict: true`; JavaScript consumers remain supported through `allowJs: true` and `checkJs: false`.

**Evidence:** `npm run typecheck` and `npm run build`.

## TD004 - Generated Backup Files In Source Tree

**Resolved:** Tracked backup files were removed, `*.bak` is ignored, and ctix runs with `backup: false`.

**Evidence:** `npm run build` completes without leaving `src/**/*.bak`; package smoke rejects `.bak` artifacts.

## TD005 - Release Verification Gap

**Resolved by US005:** The build compiles exports and declarations and `npm run package:smoke` checks packed contents, reset exports, absence of backups, and ESM-only consumption.

## TD006 - Platform-Only GlideQuery Fidelity

**Resolved contract:** ACL/security filter methods, automatic-system-field disabling, and forced updates are deterministic immutable no-op markers. Metadata flags and encoded-query `DYNAMIC`/`ON` clauses throw explicit unsupported errors.

**Evidence:** `docs/compatibility.md`; `test/unit/MockGlideQuery.test.ts`.
