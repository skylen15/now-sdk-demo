# Architecture

## Purpose

`now-sdk-mock` is a local test double library for ServiceNow scoped applications and classic Script Includes. It emulates selected server-side APIs in Node.js so Jest tests can run without a ServiceNow instance.

## System Boundaries

- Consumers import the package from `src/index.ts` after compilation to `dist/`.
- The library depends on `@servicenow/glide`, aliased to `servicenow-glide`, for compatible types and stubs.
- The library does not connect to a ServiceNow instance or persist data outside the process.
- `example/sdk-mock-script-include/` is a consumer example, not production library source.

## Layers

1. **Public API and mock classes** (`src/@servicenow/glide/`, `src/cache/`)
   Implements Glide APIs, GlideQuery functional helpers, outbound REST mocks, and scoped cache behavior exposed to consumers.
2. **Environment adapters** (`src/config/sn_js/`, `src/common/`)
   Registers Rhino-style globals and derives GlideRecord fields from ServiceNow declaration files.
3. **In-memory state** (`src/data/`)
   Owns singleton databases, tables, properties, events, business rules, and REST fixture state.
4. **Verification** (`test/unit/`)
   Jest tests exercise public behavior and stateful collaborators.

## Important Flows

### GlideRecord

`MockGlideRecord` reads and writes `Database`/`InMemoryDataTable`, wraps field values as `MockGlideElement`, evaluates query state, and invokes registered before/after business rules.

### GlideQuery

`MockGlideQuery` builds immutable query plans. `QueryEngine` evaluates those plans for both GlideQuery and GlideRecord, while `MockOptional` and lazy `MockStream` expose terminal results.

### Test Environment

`initSNTestEnvironment()` reads `glide.server.d.ts` through `GlideRecordDBInit` to make declared fields available. `initSnRhinoEnvironment()` registers globals such as `GlideRecord`, `GlideDateTime`, `AbstractAjaxProcessor`, and `gs`. `resetMockState()` restores every mutable process-local store and those globals while preserving singleton identities.

### Outbound REST

`MockRESTMessageV2` records request configuration and returns `MockRESTResponseV2`; shared templates and configured responses live in `RESTDataStore`.

## Design Constraints

- API fidelity is intentionally partial; unsupported ServiceNow behavior is classified in [docs/compatibility.md](docs/compatibility.md) and tested as a mock contract.
- Singleton state improves setup ergonomics; consumers use `resetMockState()` for complete test isolation.
- Public exports and generated declarations are compatibility-sensitive.
- Version 2 is ESM-only; CommonJS consumers are not supported.
- Production TypeScript is strict while `allowJs: true` and `checkJs: false` preserve ServiceNow JavaScript consumer support.
