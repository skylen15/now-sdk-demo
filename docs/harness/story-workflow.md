# Story Workflow

This workflow covers story intake through merge. Release and deployment work
follows `release-workflow.md`.

## 1. Intake and Definition of Ready

- Run `npm run harness:init`.
- Read `AGENTS.md`, `state.md`, `session-handoff.md`, `backlog.json`, the active
  `docs/stories/*.md` file, and relevant harness rules.
- Work on exactly one active story. Do not begin another story until the active
  story is complete or explicitly paused.
- Confirm ServiceNow story status from `rm_story` when instance work is in scope.
- Do not start implementation until the story has:
  - a clear business outcome and product-owner priority;
  - testable acceptance criteria and a `## Testing` section;
  - identified dependencies and security/platform impact;
  - defined UI, API, and data behavior where relevant; and
  - scope small enough for one short-lived branch.

## 2. Plan and Review

- Review requirements against relevant skill packages:
  - `platform-review/SKILL.md` and `security-review/SKILL.md` for metadata,
    server, or Fluent changes;
  - `ui-review/SKILL.md` for React/client changes;
  - `test-review/SKILL.md` for every story; and
  - `docs-review/SKILL.md` when story, harness, decisions, or acceptance criteria
    alignment is involved.
- Check whether ServiceNow, Now SDK, or an approved dependency already provides
  the needed pattern before proposing custom code or metadata.
- Consolidate findings into an implementation and verification checklist.
- Resolve conflicts in this order: `AGENTS.md`, harness rules, story notes.
- Record durable architecture choices in `decisions.md`.

## 3. Branch

- Start from current `main`.
- Use one short-lived branch per concern:
  - `story/US006-due-date-priority`
  - `bug/US006-overdue-timezone`
  - `experiment/spike-description`
- Target completion within two working days. Split work that reviewers cannot
  understand in about 30 minutes.
- Never deploy a story branch to production.

## 4. TDD and Build

- Use failing-test-first development for business logic, server scripts, and bug
  fixes. Every bug fix requires a regression test.
- Test ACL/security behavior locally first where feasible, then validate with ATF.
- Test React interactions with component/browser tests first where feasible.
- For Fluent metadata or configuration-only changes, build/validation evidence is
  required; test-first development is optional.
- Document any test-first exception in the PR.
- Edit source-controlled app files only. Do not mutate `references/`, `repos/`,
  generated SDK output, or runtime output.

## 5. Local Verification

- Follow `verification.md`; completion requires recorded evidence.
- Re-read acceptance criteria and review the changed-file diff against every
  relevant skill and rule.
- Run required local checks, including `npm run build` when feasible.
- Update `state.md`, `decisions.md`, `quality-score.md`, and `tech-debt.md` when
  their durable content changed.
- Update `session-handoff.md` with commands, results, blockers, and next command.

## 6. Commit

- Use small, coherent Conventional Commits, for example:

  `feat(todo): add priority filtering`

- Include tests with implementation and add a `Story: US006` footer.
- Exclude secrets, generated/build output, and unrelated changes.
- Branch history may be rewritten before merge. Do not rewrite shared `main`,
  release, or hotfix history.

## 7. Push, PR, and Merge

- Push the branch and open a PR using `.github/pull_request_template.md`.
- Target one story/concern and no more than about 400 changed source lines.
  Generated files do not count. Explain unavoidable larger PRs.
- Require one reviewer; require two for platform/security-sensitive changes.
- Authors cannot approve their own PR. Unresolved comments and failed required
  checks block merge.
- Required checks target:
  - harness validation;
  - format/lint and type checking;
  - unit/integration tests;
  - `npm run build` and `git diff --check`;
  - secret/security scans; and
  - required approval policy.
- Record missing CI capabilities as gaps until implemented.
- Squash merge into protected `main`; delete the story branch after merge.

## 8. Story State

Use these lifecycle states:

`In Development` -> `Locally Complete` -> `PR Approved` -> `Merged` ->
`Release Candidate` -> `TEST Verified` -> `UAT Accepted` -> `Released`

A story is Done only after production deployment and post-deploy validation.
