# Security Review Skill

Use this skill to review access control and data isolation for the Personal Todo app.

## Review Areas

- Roles and ACLs
- Owner-only access
- Admin/developer support behavior
- Table API exposure
- Cross-user data leakage risks

## Rules

- Personal Todo records are private to the owner by default.
- Before recommending custom security logic, verify whether ServiceNow ACLs, roles, Security Data Filters, table settings, or Now SDK metadata already provide the needed enforcement pattern.
- Team/workgroup sharing is out of scope unless a story explicitly changes that.
- UI filtering is not a security boundary.
- ACLs and server/platform behavior must enforce isolation.

## Output Checklist

- [ ] Security findings (are there any security or isolation concerns?)
- [ ] Required ACL or role changes (what ACLs/roles need adjustment?)
- [ ] Negative test cases (what testing is required to verify data isolation?)
- [ ] Residual risks (any risks remaining after changes?)
