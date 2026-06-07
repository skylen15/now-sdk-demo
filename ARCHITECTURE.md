# Personal Todo Architecture

This document describes the durable system shape of the Personal Todo
application. It explains component responsibilities and boundaries; it does not
replace the PRD, story acceptance criteria, harness state, or implementation
rules.

## System Context

Personal Todo is a scoped ServiceNow application implemented with Now SDK and
Fluent metadata. Users interact with a React UI page, while ServiceNow tables,
ACLs, and platform APIs provide persistence and enforce data access.

## Architecture Layers

### Client

- `src/client/routes/` defines TanStack Router routes.
- `src/client/components/` contains reusable React UI components.
- `src/client/services/` owns client-side platform and data-access helpers.
- `src/client/utils/` contains pure client utilities.
- TanStack Query owns server-state fetching, caching, and mutation lifecycle.

The client may filter and present ACL-visible records, but it is not a security
boundary.

### Platform Metadata

- `src/fluent/` contains hand-authored Now SDK Fluent metadata.
- `src/fluent/generated/` contains SDK-generated metadata and key registries.
- Tables and ACLs are the authoritative persistence and access-control layer.

Generated SDK output must not be edited by hand.

### Server

- `src/server/` contains reusable server-side implementation modules when a
  platform-native capability or Fluent artifact needs supporting logic.
- Server behavior must preserve scoped-app boundaries and owner isolation.

## Data And Security Boundaries

- ServiceNow tables are the application data source of truth.
- ACLs enforce record and field access; client-side filtering is presentation
  behavior only.
- Instance schema snapshots in `references/` are read-only implementation
  references.
- ServiceNow Agile `rm_story` records are the backlog source of truth;
  `docs/harness/backlog.json` is a local mirror.

## Delivery And Validation

- Story work follows `docs/harness/story-workflow.md`.
- Durable current status lives in `docs/harness/state.md`.
- Architecture decisions live in `docs/harness/decisions.md`.
- Completion evidence follows `docs/harness/verification.md`.
- Quality trends and known gaps live in `docs/harness/quality-score.md`.
- Cross-story technical debt lives in `docs/harness/tech-debt.md`.

## Change Policy

Update this document when component responsibilities, system boundaries,
authoritative data sources, or major technology choices change. Record the
reason for significant architecture changes in `docs/harness/decisions.md`.
