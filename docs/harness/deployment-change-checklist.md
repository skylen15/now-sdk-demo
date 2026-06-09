# Deployment and Change Checklist

## Before UAT or PROD

- [ ] Release owner and backup named.
- [ ] Exact release branch, tag/commit, artifact, and SHA-256 recorded.
- [ ] Required local, CI, TEST, and UAT evidence passed.
- [ ] Target SDK alias and instance independently verified.
- [ ] ServiceNow Change Request number and approved state recorded.
- [ ] Change window open for target deployment.
- [ ] Implementation, validation, rollback, data-impact, and monitoring plans attached.
- [ ] Previous known-good version/artifact available.
- [ ] Required business and release-owner approvals recorded.
- [ ] No parallel deployment targets the same instance.

## After Deployment

- [ ] Deployed version/commit verified.
- [ ] Critical Todo flow smoke passed.
- [ ] Health, audit, and error logs reviewed.
- [ ] Monitoring period completed.
- [ ] Evidence recorded in release record and Change Request.
- [ ] Stories moved to Released/Done only after PROD validation.
- [ ] Production commit tagged; temporary release branch removed.
- [ ] Failed deployment classified and rollback/forward-fix evidence recorded.
