# API Compatibility

`@kobidev/now-sdk-mock` provides deterministic local test doubles, not a ServiceNow runtime. Public behavior is classified below so tests do not accidentally rely on platform-only semantics.

| API area | Status | Local contract | Verification |
|---|---|---|---|
| `MockGlideRecord` queries and mutations | Supported | Uses the in-memory `Database` and shared `QueryEngine`. | `test/unit/MockGlideRecord.test.ts`, `test/unit/MockGlideQuery.test.ts` |
| `MockGlideQuery` builders, reads, mutations, aggregates | Supported | Immutable plans execute against the in-memory database. | `test/unit/MockGlideQuery.test.ts` |
| `MockOptional` and `MockStream` | Supported | Deterministic functional helpers, including lazy stream operations. | `test/unit/MockFunctionalHelpers.test.ts` |
| Business rules | Simplified | Registered synchronous before/after rules run for supported mutations unless workflow is disabled. | `test/unit/BusinessRules.test.ts`, `test/unit/MockGlideQuery.test.ts` |
| Rhino globals and classic Script Includes | Supported | Globals are registered in Node and classic scripts are evaluated without CommonJS. | `test/unit/RhinoEnvironment.test.ts` |
| REST messages, properties, events, scoped cache | Simplified | Process-local stores expose configuration and observation APIs; no network or platform queue is used. | `test/unit/RESTMocks.test.ts`, `test/unit/PropertyDB.test.ts`, `test/unit/EventQueue.test.ts`, `test/unit/MockScopedCacheManager.test.ts` |
| `resetMockState()` | Supported | Synchronously restores all exported singleton/static stores and Rhino globals while preserving singleton identities. | `test/unit/ResetMockState.test.ts` |
| `withAcls()` and `withSecurityDataFilters()` | No-op marker | Immutable plan markers; no ACL or security-data-filter enforcement is claimed. | `test/unit/MockGlideQuery.test.ts` |
| `disableAutoSysFields()` and `forceUpdate()` | No-op marker | Immutable plan markers without platform side effects. | `test/unit/MockGlideQuery.test.ts` |
| Metadata field flags such as `$DISPLAY` | Unsupported | Selection throws an explicit mock limitation error. | `test/unit/MockGlideQuery.test.ts` |
| Encoded-query `DYNAMIC` and `ON` operators | Unsupported | Parsing throws an explicit unsupported-clause error. | `test/unit/MockGlideQuery.test.ts` |

Unsupported or no-op behavior must remain explicit, deterministic, documented, and covered by focused tests. The mock does not simulate ServiceNow authorization, schema metadata, dynamic filters, or instance services.
