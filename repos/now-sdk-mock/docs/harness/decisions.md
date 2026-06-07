# Decisions

## D001 - Model ServiceNow APIs With In-Memory Test Doubles

- **Status:** Accepted
- **Decision:** Keep runtime behavior local and deterministic; do not require or silently call a ServiceNow instance.
- **Reason:** The package exists to make unit tests fast, repeatable, and usable offline.

## D002 - Preserve Two Consumer Styles

- **Status:** Accepted
- **Decision:** Support SDK/module consumers through package exports and classic Script Includes through Rhino-style globals.
- **Reason:** Existing source and the example project demonstrate both integration paths.

## D003 - Treat Mock Behavior As A Versioned Contract

- **Status:** Accepted
- **Decision:** Behavioral changes to public mocks require focused tests and documentation when they differ from ServiceNow semantics.
- **Reason:** Full platform fidelity is impractical; explicit, stable behavior is more valuable than undocumented approximation.

## D004 - Keep Harness Infrastructure Portable

- **Status:** Accepted
- **Decision:** Project customization belongs in state, backlog, stories, and project docs; harness workflows, rules, skills, and scripts remain portable.

## D005 - Publish Version 2 As ESM-Only

- **Status:** Accepted
- **Decision:** Version 2 exposes import-only package exports and removes authored CommonJS from source, tests, examples, and documentation.
- **Reason:** GlideQuery and future mocks should use one modern module contract without maintaining a second output format.

## D006 - Share Query Evaluation

- **Status:** Accepted
- **Decision:** GlideQuery and GlideRecord use the same in-memory query evaluator; platform-only security and metadata behavior is documented as unsupported.
- **Reason:** Shared evaluation prevents mock APIs from returning contradictory results while avoiding false ServiceNow fidelity.

## D007 - Provide One Stable Reset Contract

- **Status:** Accepted
- **Decision:** Export synchronous `resetMockState()` and preserve singleton identities while clearing their mutable contents.
- **Reason:** Consumers need complete isolation without invalidating references captured during test setup.

## D008 - Compile Production TypeScript Strictly

- **Status:** Accepted
- **Decision:** Enable `strict: true` for production TypeScript while retaining unchecked JavaScript consumer support.
- **Reason:** Strict production contracts catch defects without rejecting classic ServiceNow JavaScript.

## D009 - Make Platform-Only Behavior Explicit

- **Status:** Accepted
- **Decision:** Document and test platform-only methods as deterministic no-op markers or explicit unsupported errors.
- **Reason:** Stable local contracts are safer than implying ACL, metadata, or dynamic-filter fidelity.
