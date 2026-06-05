# ServiceNow Personal Todo App PRD and Build Plan

## 1. Product Summary

Build a ServiceNow-native personal todo application for individual users. The primary experience is a React 18 UI inspired by TodoMVC: fast entry, inline editing, simple filters, and a dense task list. The v1 app extends that baseline with practical personal productivity features: due dates, priorities, tags, notes, search, saved filters, recurring tasks, and lightweight reminders.

The app should feel native to ServiceNow rather than like an external web app. It should use ServiceNow authentication and identity, store each user's personal tasks in scoped application data, and expose a focused app page/workspace-style experience for daily repeated use.

Team/workgroup task management is explicitly deferred. V1 is not an assignment, approval, project management, or shared work queue system.

## 2. Goals

- Provide a personal task list inside ServiceNow for authenticated internal users.
- Preserve the speed and clarity of TodoMVC while adding realistic productivity workflows.
- Keep v1 scoped to private user-owned tasks.
- Define a ServiceNow-aware implementation path using the Now SDK, React 18, and scoped app metadata.
- Avoid any requirement for live ServiceNow credentials to complete this PRD/build plan.

## 3. Non-Goals

- Team task assignment, shared lists, watchers, comments, or workgroup permissions.
- Replacing ServiceNow Task, Incident, Request, or Project functionality.
- Deep calendar synchronization.
- Mobile-native app implementation.
- Complex workflow automation beyond lightweight personal reminders and recurrence handling.
- A public marketing page or portal-first experience.

## 4. Primary User

The primary user is an individual authenticated ServiceNow user who wants a private task list within the same platform where they already work.

Typical needs:

- Capture tasks quickly without navigating away from ServiceNow.
- See what is due today, upcoming, overdue, or blocked by priority.
- Organize tasks with tags and saved filters.
- Track recurring personal routines.
- Receive lightweight reminders without building a full workflow system.

## 5. Experience Principles

- Fast capture first: adding a task should be a single-line action.
- Dense, scannable layout: avoid dashboard ornamentation and marketing-style pages.
- TodoMVC familiarity: list, toggle complete, edit title, delete, clear completed, and filter by active/completed remain recognizable.
- ServiceNow-native behavior: authenticated user context, scoped data, platform roles, and standard deployment patterns.
- Personal privacy by default: a user sees only their own tasks unless future team scope is deliberately added.

## 6. MVP Feature Set

### 6.1 Task Capture

Users can create a task with a title from the main input.

Acceptance criteria:

- Empty titles cannot be saved.
- Leading/trailing whitespace is trimmed.
- Newly created tasks default to active, normal priority, no due date, no tags, and owner equal to the current user.
- The task appears immediately in the current list if it matches the active filter.

### 6.2 TodoMVC Core Actions

Users can complete, reactivate, edit, and delete tasks.

Acceptance criteria:

- A checkbox toggles complete/incomplete.
- Inline title editing supports save and cancel behavior.
- Completed tasks keep their metadata and completion timestamp.
- Delete requires a clear destructive action and removes the task from the visible list.
- A clear-completed action is available when completed tasks exist.

### 6.3 Filters

Users can filter by all, active, completed, today, upcoming, overdue, priority, and tag.

Acceptance criteria:

- Filter state updates the list without losing unsaved input text.
- Counts are visible for active and completed tasks.
- Overdue excludes completed tasks.
- Today uses the user's local date interpretation in the UI and stores dates consistently in the backend.

### 6.4 Search

Users can search task title and notes.

Acceptance criteria:

- Search applies together with the selected filter.
- Search results update without a full page reload.
- Empty search returns the normal filtered list.
- Matching should be case-insensitive.

### 6.5 Due Dates

Users can set, change, or clear due dates.

Acceptance criteria:

- Due date is optional.
- Tasks can be grouped or sorted by due date.
- Overdue tasks are visually distinguishable.
- Completed tasks do not appear as overdue.

### 6.6 Priority

Users can set priority: low, normal, high, urgent.

Acceptance criteria:

- Normal is the default.
- Priority can be changed from the task row or details panel.
- Sorting can prioritize urgent/high tasks.
- Priority styling is visible but restrained.

### 6.7 Tags

Users can add tags to tasks and filter by tag.

Acceptance criteria:

- Tags are user-scoped.
- Duplicate tags are normalized for the same user.
- Tags can be added from the task editor.
- Removing a tag from one task does not delete it from other tasks.

### 6.8 Notes

Users can add longer notes to a task.

Acceptance criteria:

- Notes are optional.
- Task rows indicate when notes exist.
- Notes can be edited without changing the task title.
- Search includes notes.

### 6.9 Saved Filters

Users can save a filter/search/sort combination as a named view.

Acceptance criteria:

- A saved filter belongs to the current user.
- Saved filters can include status, due date bucket, priority, tags, search text, and sort order.
- Users can rename or delete saved filters.
- The app loads a sensible default view when no saved filter is selected.

### 6.10 Recurring Tasks

Users can configure a task to recur daily, weekly, monthly, or on selected weekdays.

Acceptance criteria:

- Recurrence is optional.
- Completing a recurring task creates or schedules the next occurrence according to the recurrence rule.
- Users can stop recurrence.
- The original recurrence configuration remains editable.
- The plan should validate final recurrence behavior before implementation because ServiceNow date/time handling and user timezone behavior must be confirmed.

### 6.11 Lightweight Reminders

Users can set a reminder date/time for a task.

Acceptance criteria:

- Reminder is optional.
- Reminder can be set independently of due date.
- Reminder state is visible in the task row/details.
- Delivery mechanism is an implementation decision: in-app notification, ServiceNow event/notification, or both.
- The MVP may treat reminder delivery as a platform notification configuration rather than a custom notification engine.

## 7. UX Model

### 7.1 Main App Page

The first screen is the working todo interface, not a landing page.

Layout:

- Left or top navigation for saved filters and core filters.
- Main task input at the top of the task area.
- Task list below, optimized for scanning.
- Compact task row with checkbox, title, due date, priority, tags, reminder indicator, and row actions.
- Optional details panel or inline expansion for notes, recurrence, and advanced metadata.

### 7.2 Expected States

- Empty state: shows a compact prompt to add the first task.
- Loading state: keeps layout stable and shows list skeletons or progress affordance.
- Error state: shows retry and concise failure context.
- No results: tells the user no tasks match the current filter/search.
- Overdue state: visually marks overdue active tasks.
- Completed state: completed title styling is subdued and reversible.

### 7.3 Core Flows

Create task:

1. User enters a title.
2. User presses Enter or clicks add.
3. App creates a personal active task.
4. Input clears and task appears in list.

Complete task:

1. User checks the task.
2. App marks it completed and records completed timestamp.
3. If recurring, app applies the recurrence rule to generate or schedule the next occurrence.

Organize task:

1. User opens row details or inline metadata controls.
2. User sets due date, priority, tags, notes, reminder, or recurrence.
3. App saves metadata and updates list membership/sorting.

Save filter:

1. User configures filters/search/sort.
2. User saves the current view with a name.
3. Saved view appears in navigation and can be selected later.

## 8. Data Concepts

The exact table and field names should be finalized during Now SDK implementation, but the app needs these concepts.

### 8.1 Personal Task

Suggested fields:

- owner: reference to user.
- title: required string.
- notes: optional long text.
- status: active or completed.
- priority: low, normal, high, urgent.
- due_date: optional date.
- reminder_at: optional date/time.
- completed_at: optional date/time.
- recurrence_rule: optional structured value or reference.
- parent_recurring_task: optional reference for generated occurrences.
- created/updated audit fields.

### 8.2 Tag

Suggested fields:

- owner: reference to user.
- name: required string.
- normalized_name: required string for duplicate prevention.

### 8.3 Task Tag Mapping

Suggested fields:

- task: reference to personal task.
- tag: reference to tag.

### 8.4 Saved Filter

Suggested fields:

- owner: reference to user.
- name: required string.
- filter_json: structured filter/search/sort state.
- is_default: optional boolean.

### 8.5 Reminder/Recurrence Support

Depending on implementation validation, reminders and recurrence may be represented directly on the task table or separated into supporting records. The build plan should avoid overfitting until ServiceNow notification/event and schedule behavior is validated.

## 9. Security and Access

V1 access rules:

- Users can read, create, update, and delete only their own personal tasks.
- Users can read and manage only their own tags and saved filters.
- Admin/developer access can exist for support, but normal users must not see other users' task data.
- Any future team feature must introduce explicit sharing, assignment, and role rules rather than weakening personal ACLs.

Implementation should define roles and ACLs through scoped app metadata. The final ACL pattern should be validated against ServiceNow platform behavior during build.

## 10. ServiceNow/Now SDK Build Plan

The current workspace is empty, so implementation begins with project scaffolding.

### 10.1 Prerequisites

Validated from current ServiceNow SDK documentation:

- Node.js 20 or later.
- npm.
- Access to a ServiceNow PDI or enterprise instance for auth/install once implementation reaches deployment validation.
- ServiceNow SDK commands available through `npx @servicenow/sdk` and `npx now-sdk`.

### 10.2 Project Setup

Planned setup commands:

```bash
npx @servicenow/sdk init \
  --appName "Personal Todo" \
  --packageName "personal-todo" \
  --scopeName "x_<company_code>_personal_todo" \
  --template "base"

npm install
```

Open decision:

- Replace `<company_code>` with the company code from the instance property `glide.appcreator.company.code`, or accept a generated scope at the user's risk.

### 10.3 Auth Setup

Auth should be planned but not required to complete this PRD.

Commands to validate or configure credentials when an instance is available:

```bash
npx now-sdk auth --list
npx now-sdk auth --add <instance-url> --type <basic|oauth>
npx now-sdk auth --use <alias>
```

Assumptions:

- Basic auth is acceptable for local PDI-style development.
- OAuth is preferred for enterprise instances where client credentials and a service user are available.
- Auth details are managed outside `now.config.json`.

### 10.4 App Metadata and Fluent Source

Expected source areas after scaffolding:

- `now.config.json` for app metadata such as scope, scopeId, app name, and TypeScript config path.
- `src/fluent/` for ServiceNow metadata definitions.
- `src/server/` for server-side script functions.

Implementation tasks:

1. Define scoped tables for personal tasks, tags, task-tag mappings, and saved filters.
2. Define roles and ACLs for user-owned data.
3. Define any server-side logic needed for recurrence, reminder processing, saved filter validation, and task operations.
4. Add a React 18 UI page/component surface for the TodoMVC-like experience.
5. Wire UI data operations to ServiceNow records through the chosen platform API pattern.
6. Add notification/event configuration if reminder delivery is included in MVP.

### 10.5 Build and Deployment Workflow

Expected workflow:

```bash
npx @servicenow/sdk build
npx @servicenow/sdk install
```

Deployment validation requires auth and a live instance. Until credentials exist, the build plan can still be reviewed and local source can be compiled where dependencies are installed.

Optional packaging command for later release planning:

```bash
npx @servicenow/sdk pack
```

## 11. Implementation Roadmap

### Phase 0: Product and Technical Validation

- Confirm ServiceNow app surface for the React 18 experience.
- Confirm exact SDK-supported UI artifact pattern for React in the target SDK version.
- Confirm scope name and company code.
- Confirm reminder delivery mechanism.
- Confirm recurrence behavior and timezone expectations.

Exit criteria:

- No unresolved platform decision blocks scaffolding.
- MVP acceptance criteria are approved.

### Phase 1: Now SDK Project Foundation

- Scaffold the app with Now SDK.
- Install dependencies.
- Establish app metadata and folder structure.
- Add initial build command.

Exit criteria:

- Project builds with no Fluent syntax errors.
- Auth remains optional unless deployment validation is requested.

### Phase 2: Data Model and Security

- Create task, tag, mapping, and saved filter metadata.
- Add roles and ACLs for owner-only access.
- Add server-side recurrence/reminder support placeholders where needed.

Exit criteria:

- Data model supports all MVP concepts.
- Access rules preserve personal data isolation.

### Phase 3: React 18 Task Experience

- Build the main TodoMVC-like UI.
- Implement create, complete, edit, delete, clear completed.
- Implement filters, search, sorting, and empty/loading/error states.

Exit criteria:

- User can manage personal tasks from the main app page.
- UI remains dense, native-feeling, and responsive.

### Phase 4: Productivity Features

- Add due dates, priority, tags, notes, saved filters, recurrence, and reminders.
- Validate edge cases for overdue, recurring completion, reminder edit/delete, and search.

Exit criteria:

- All MVP acceptance criteria pass in local or instance-backed verification.

### Phase 5: Instance Validation

- Configure SDK auth.
- Install to a PDI or enterprise dev instance.
- Validate ACLs with at least two users.
- Validate build/install/reinstall workflow.

Exit criteria:

- App installs successfully.
- Users cannot access each other's personal task data.
- MVP workflows work on the ServiceNow instance.

## 12. Future Team/Workgroup Plan

Future scope can add:

- Shared lists.
- Task assignment.
- Watchers/followers.
- Comments and activity stream.
- Team saved filters.
- Group-level ACLs.
- Notifications for assignment and due dates.
- Relationship to native ServiceNow Task records where appropriate.

Future team features should be planned as a separate phase because they change ownership, ACLs, UX, and data model assumptions.

## 13. Open Decisions Before Build

- Exact ServiceNow UI surface for the React 18 app page/workspace.
- Company code and final scope name.
- Whether reminder delivery is in-app only, ServiceNow notification-based, or both.
- Whether recurrence stores rules as structured JSON, separate records, or encoded platform fields.
- Whether task CRUD should be direct record API, scripted API, or another ServiceNow-native integration pattern.
- Whether saved filters should support arbitrary query syntax or only structured UI state.

## 14. Verification Checklist

The plan is ready for implementation when these are true:

- The PRD defines goals, non-goals, primary user, MVP features, UX flows, data concepts, access rules, and future scope.
- V1 remains personal-user scoped and explicitly defers team collaboration.
- The Now SDK path includes setup, auth, metadata, build, install, and deployment prerequisites.
- No live ServiceNow credentials are required to review this plan.
- Open decisions are isolated and do not prevent product review.

