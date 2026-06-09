# Release Workflow

## Policy

- Use a biweekly release train and semantic versions.
- `main` remains open for new merged stories while a release is validated.
- Freeze each candidate on temporary `release/<version>` branch, such as
  `release/1.4.0`.
- Promote the same immutable artifact through TEST, UAT, and PROD when Now SDK
  supports retained-artifact installation. Otherwise use the same Git commit,
  lockfile, SDK version, Node version, and clean build procedure; record commit
  SHA and artifact checksum for every deployment.
- Use one named rotating release owner and one backup per release.

## 1. Start Release

1. Select completed stories for the biweekly train.
2. Create `release/<version>` from the chosen `main` commit.
3. Create `docs/releases/v<version>.md` from the release-record template.
4. Record release commit, contents, owner, backup, target dates, and risks.
5. Freeze scope. Allow only release-blocking defects, required security fixes, or
   required deployment/config corrections. Record any exception approval.

## 2. Build and Identify Candidate

1. Run all required checks from `verification.md`.
2. Build once and retain the immutable artifact when supported.
3. Generate a SHA-256 checksum:

   `Get-FileHash <artifact-path> -Algorithm SHA256`

4. Record commit SHA, artifact path/name, checksum, tool versions, and results.
5. If retained-artifact install is unsupported, document the reproducible clean
   build procedure used for each environment.

## 3. Promote

- DEV: developer smoke and targeted tests. Developer may deploy after local
  checks and explicit instance-operation approval.
- TEST: release owner/CI deploys; run automated regression and ATF.
- UAT: business acceptance and release-critical regression. Requires approved
  ServiceNow Change Request.
- PROD: release owner deploys only after business approval and approved Change
  Request window. Run read-only smoke, health checks, and audit/log review.
- Never automatically deploy PROD after merge.
- Verify the selected SDK alias and target instance before every instance action.
- Use environment-specific secrets only; never store credentials in the repo.
- Prevent parallel deployments to the same instance.

## 4. ServiceNow Change Request

- Use one Normal Change per biweekly release covering UAT and PROD with separate
  implementation tasks, gates, and timestamps.
- Use a separate Emergency Change for each hotfix.
- Attach implementation, test, validation, rollback, data-impact, and monitoring
  plans.
- Require approved state, target instances, Change number, and open change window
  before UAT or PROD promotion.
- Missing approval or evidence means skip the window. No routine exception.

## 5. Post-Deploy Validation

- Verify deployed version/commit and critical Todo flow.
- Monitor production errors and logs for 30-60 minutes with named support
  coverage.
- Record results and close the Change Request with evidence.
- Mark stories Released/Done only after successful production validation.
- Tag the production commit, for example `v1.4.0`, then delete the release branch.

## 6. Failure and Rollback

- Stop the pipeline and block later promotions after any failed deployment.
- Preserve logs, artifact, checksum, and health-check evidence.
- Retry only a confirmed transient failure; never rerun blindly.
- Release owner classifies retry, forward-fix, or rollback.
- Keep the previous known-good version/artifact available.
- Code/metadata failure normally rolls back to the previous version.
- Data migrations require a tested recovery/reconciliation procedure; code
  rollback does not restore changed data.
- Test rollback in TEST before the first production release.

## 7. Release Fixes and Hotfixes

- Apply release blockers to the release branch with regression tests and required
  review. Merge each fix back into `main`.
- Branch a hotfix from the current production tag:

  `v1.4.0` -> `hotfix/1.4.1-owner-isolation` -> TEST -> UAT smoke -> PROD ->
  `v1.4.1`

- Keep required checks and production approval. Only unrelated checks may be
  waived with recorded risk approval.
- Merge hotfixes into `main` and any active release branch.

## 8. Feature Flags and Data Changes

- Use feature flags sparingly; default off, test on/off paths, document state per
  instance, and create a removal story with expiry date.
- Never use a UI-only feature flag as a security boundary.
- Production flag enablement requires Change approval.
- Prefer backward-compatible additive schema changes.
- Separate destructive cleanup into a later release; document migration,
  existing-data impact, rollback limits, and required backup/export.

## 9. Incident Handling

- Release owner is initial incident commander after deployment.
- Stop rollout, preserve evidence, assess severity/data/security impact, and
  notify the business owner.
- Roll back or forward-fix through an Emergency Change.
- Record timeline, impacted version, recovery, regression tests, and actions.
- Run a blameless review for severe incidents.
