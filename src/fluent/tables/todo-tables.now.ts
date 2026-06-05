import {
  BooleanColumn,
  DateTimeColumn,
  JsonColumn,
  ReferenceColumn,
  StringColumn,
  Table,
} from "@servicenow/sdk/core";

export const x_2063979_todo_task = Table({
  name: "x_2063979_todo_task",
  label: "Todo Task",
  display: "title",
  accessibleFrom: "package_private",
  callerAccess: "none",
  allowWebServiceAccess: true,
  actions: ["create", "read", "update", "delete"],
  audit: true,
  schema: {
    owner: ReferenceColumn({
      label: "Owner",
      referenceTable: "sys_user",
      mandatory: true,
      cascadeRule: "restrict",
    }),
    title: StringColumn({ label: "Title", mandatory: true, maxLength: 255 }),
    status: StringColumn({
      label: "Status",
      mandatory: true,
      default: "active",
      maxLength: 40,
      choices: {
        active: { label: "Active" },
        completed: { label: "Completed" },
      },
      dropdown: "dropdown_without_none",
    }),
    priority: StringColumn({
      label: "Priority",
      default: "normal",
      maxLength: 40,
      choices: {
        low: { label: "Low" },
        normal: { label: "Normal" },
        high: { label: "High" },
        urgent: { label: "Urgent" },
      },
      dropdown: "dropdown_without_none",
    }),
    due_at: DateTimeColumn({ label: "Due date" }),
    notes: StringColumn({ label: "Notes", maxLength: 4000 }),
    reminder_at: DateTimeColumn({ label: "Reminder" }),
    recurrence: JsonColumn({ label: "Recurrence" }),
    completed: BooleanColumn({ label: "Completed", defaultValue: false }),
    completed_at: DateTimeColumn({ label: "Completed at" }),
  },
});

export const x_2063979_todo_tag = Table({
  name: "x_2063979_todo_tag",
  label: "Todo Tag",
  display: "name",
  accessibleFrom: "package_private",
  callerAccess: "none",
  allowWebServiceAccess: true,
  actions: ["create", "read", "update", "delete"],
  audit: true,
  schema: {
    owner: ReferenceColumn({
      label: "Owner",
      referenceTable: "sys_user",
      mandatory: true,
      cascadeRule: "restrict",
    }),
    name: StringColumn({ label: "Name", mandatory: true, maxLength: 100 }),
    normalized_name: StringColumn({
      label: "Normalized name",
      mandatory: true,
      maxLength: 100,
    }),
  },
});

export const x_2063979_todo_task_tag = Table({
  name: "x_2063979_todo_task_tag",
  label: "Todo Task Tag",
  display: "task",
  accessibleFrom: "package_private",
  callerAccess: "none",
  allowWebServiceAccess: true,
  actions: ["create", "read", "update", "delete"],
  audit: true,
  schema: {
    owner: ReferenceColumn({
      label: "Owner",
      referenceTable: "sys_user",
      mandatory: true,
      cascadeRule: "restrict",
    }),
    task: ReferenceColumn({
      label: "Task",
      referenceTable: "x_2063979_todo_task",
      mandatory: true,
      cascadeRule: "cascade",
    }),
    tag: ReferenceColumn({
      label: "Tag",
      referenceTable: "x_2063979_todo_tag",
      mandatory: true,
      cascadeRule: "cascade",
    }),
  },
});

export const x_2063979_todo_saved_filter = Table({
  name: "x_2063979_todo_saved_filter",
  label: "Todo Saved Filter",
  display: "name",
  accessibleFrom: "package_private",
  callerAccess: "none",
  allowWebServiceAccess: true,
  actions: ["create", "read", "update", "delete"],
  audit: true,
  schema: {
    owner: ReferenceColumn({
      label: "Owner",
      referenceTable: "sys_user",
      mandatory: true,
      cascadeRule: "restrict",
    }),
    name: StringColumn({ label: "Name", mandatory: true, maxLength: 100 }),
    filter_state: JsonColumn({ label: "Filter state", mandatory: true }),
  },
});
