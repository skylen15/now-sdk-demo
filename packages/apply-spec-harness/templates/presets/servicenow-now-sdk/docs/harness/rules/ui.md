# UI Rules

- Build the actual working todo experience as the first screen.
- Keep the UI dense, scannable, and native-feeling for ServiceNow users.
- Preserve TodoMVC familiarity: capture, list, complete, reactivate, edit, delete, clear completed, and filters.
- Loading, error, empty, and no-results states must not create major layout shift.
- Avoid landing-page, marketing, or dashboard ornamentation.
- Keep controls stable and usable across desktop and narrow viewports.
- For TanStack Router and TanStack Query behavior, use the cloned sources under `repos/tanstack-router` and `repos/tanstack-query` before relying on memory.
- Use hash-based routing only with TanStack Router so UI Page routes remain within the ServiceNow page URL.
- Follow established TanStack Query patterns for server-state fetching, caching, invalidation, and mutations.
