import { BusinessRule } from "@servicenow/sdk/core";

BusinessRule({
  $id: Now.ID["todo_task_normalize_before_save"],
  name: "Todo Task Normalize Before Save",
  table: "x_2063979_todo_task",
  when: "before",
  action: ["update", "insert"],
  order: 100,
  active: true,
  description:
    "Enforce personal todo defaults and completion state consistency.",
  script: `
(function executeRule(current, previous) {
    var completed = current.getValue('completed') === 'true' || current.getValue('completed') === '1';
    if (completed) {
        current.setValue('completed_at', new GlideDateTime());
    }
})(current, previous);
`,
});

BusinessRule({
  $id: Now.ID["todo_task_create_next_recurrence"],
  name: "Todo Task Create Next Recurrence",
  table: "x_2063979_todo_task",
  when: "after",
  action: ["update"],
  order: 200,
  active: true,
  description:
    "Create the next owner-scoped occurrence when a recurring task is completed.",
  script: `
(function executeRule(current, previous) {
    if (!current.completed.changesTo(true) || !current.getValue('recurrence')) return;

    var rule;
    try {
        rule = JSON.parse(current.getValue('recurrence'));
    } catch (error) {
        gs.error('Invalid todo recurrence JSON for ' + current.getUniqueValue());
        return;
    }
    if (!rule || ['daily', 'weekly', 'monthly', 'weekdays'].indexOf(rule.kind) < 0) return;

    var source = current.getValue('recurrence_source') || current.getUniqueValue();
    var existing = new GlideRecord('x_2063979_todo_task');
    existing.addQuery('recurrence_source', source);
    existing.addQuery('completed', false);
    existing.setLimit(1);
    existing.query();
    if (existing.next()) return;

    var nextDue = new GlideDateTime(current.getValue('due_at') || current.getValue('completed_at'));
    if (rule.kind === 'daily') nextDue.addDaysLocalTime(1);
    if (rule.kind === 'weekly') nextDue.addDaysLocalTime(7);
    if (rule.kind === 'monthly') nextDue.addMonthsLocalTime(1);
    if (rule.kind === 'weekdays') {
        do { nextDue.addDaysLocalTime(1); } while (nextDue.getDayOfWeekLocalTime() === 1 || nextDue.getDayOfWeekLocalTime() === 7);
    }

    var next = new GlideRecord('x_2063979_todo_task');
    next.initialize();
    next.setValue('owner', current.getValue('owner'));
    next.setValue('title', current.getValue('title'));
    next.setValue('priority', current.getValue('priority'));
    next.setValue('notes', current.getValue('notes'));
    next.setValue('due_at', nextDue);
    next.setValue('recurrence', current.getValue('recurrence'));
    next.setValue('recurrence_source', source);
    next.insert();
})(current, previous);
`,
});

BusinessRule({
  $id: Now.ID["todo_tag_normalize_before_save"],
  name: "Todo Tag Normalize Before Save",
  table: "x_2063979_todo_tag",
  when: "before",
  action: ["update", "insert"],
  order: 100,
  active: true,
  description: "Enforce owner and normalized tag name for personal todo tags.",
  script: `
(function executeRule(current, previous) {
    current.setValue('normalized_name', name.toLowerCase());

    var duplicate = new GlideRecord('x_2063979_todo_tag');
    duplicate.addQuery('owner', current.getValue('owner'));
    duplicate.addQuery('normalized_name', current.getValue('normalized_name'));
    duplicate.addQuery('sys_id', '!=', current.getUniqueValue());
    duplicate.setLimit(1);
    duplicate.query();
    if (duplicate.next()) {
        gs.addErrorMessage('Tag already exists.');
        current.setAbortAction(true);
    }
})(current, previous);
`,
});

BusinessRule({
  $id: Now.ID["todo_task_tag_normalize_before_save"],
  name: "Todo Task Tag Normalize Before Save",
  table: "x_2063979_todo_task_tag",
  when: "before",
  action: ["update", "insert"],
  order: 100,
  active: true,
  description: "Enforce owner consistency for personal todo task-tag mappings.",
  script: `
(function executeRule(current, previous) {
    var task = current.task.getRefRecord();
    var tag = current.tag.getRefRecord();
    if (!task.isValidRecord() || !tag.isValidRecord() ||
        task.getValue('owner') != current.getValue('owner') ||
        tag.getValue('owner') != current.getValue('owner')) {
        gs.addErrorMessage('Task and tag must belong to the current user.');
        current.setAbortAction(true);
        return;
    }

    var duplicate = new GlideRecord('x_2063979_todo_task_tag');
    duplicate.addQuery('task', current.getValue('task'));
    duplicate.addQuery('tag', current.getValue('tag'));
    duplicate.addQuery('sys_id', '!=', current.getUniqueValue());
    duplicate.setLimit(1);
    duplicate.query();
    if (duplicate.next()) {
        gs.addErrorMessage('Tag is already assigned to this task.');
        current.setAbortAction(true);
    }
})(current, previous);
`,
});
