import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['todo_task_normalize_before_save'],
    name: 'Todo Task Normalize Before Save',
    table: 'x_2063979_todo_task',
    when: 'before',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    description: 'Enforce personal todo defaults and completion state consistency.',
    script: `
(function executeRule(current, previous) {
    var title = (current.getValue('title') || '').trim();
    if (!title) {
        gs.addErrorMessage('Todo title is required.');
        current.setAbortAction(true);
        return;
    }

    current.setValue('title', title);

    if (current.operation() === 'insert') {
        current.setValue('owner', gs.getUserID());
        current.setValue('status', current.getValue('status') || 'active');
        current.setValue('priority', current.getValue('priority') || 'normal');
        if (!current.getValue('completed')) {
            current.setValue('completed', false);
        }
    } else if (previous && previous.isValidRecord() && current.owner.changes()) {
        current.setValue('owner', previous.getValue('owner'));
    }

    var completed = current.getValue('completed') === 'true' || current.getValue('completed') === '1';
    if (completed) {
        current.setValue('status', 'completed');
        if (!current.getValue('completed_at')) {
            current.setValue('completed_at', new GlideDateTime());
        }
    } else {
        current.setValue('status', 'active');
        current.setValue('completed_at', '');
    }
})(current, previous);
`,
})

BusinessRule({
    $id: Now.ID['todo_tag_normalize_before_save'],
    name: 'Todo Tag Normalize Before Save',
    table: 'x_2063979_todo_tag',
    when: 'before',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    description: 'Enforce owner and normalized tag name for personal todo tags.',
    script: `
(function executeRule(current, previous) {
    var name = (current.getValue('name') || '').trim();
    if (!name) {
        gs.addErrorMessage('Tag name is required.');
        current.setAbortAction(true);
        return;
    }

    current.setValue('name', name);
    current.setValue('normalized_name', name.toLowerCase());

    if (current.operation() === 'insert') {
        current.setValue('owner', gs.getUserID());
    } else if (previous && previous.isValidRecord() && current.owner.changes()) {
        current.setValue('owner', previous.getValue('owner'));
    }
})(current, previous);
`,
})

BusinessRule({
    $id: Now.ID['todo_task_tag_normalize_before_save'],
    name: 'Todo Task Tag Normalize Before Save',
    table: 'x_2063979_todo_task_tag',
    when: 'before',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    description: 'Enforce owner consistency for personal todo task-tag mappings.',
    script: `
(function executeRule(current, previous) {
    if (current.operation() === 'insert') {
        current.setValue('owner', gs.getUserID());
    } else if (previous && previous.isValidRecord() && current.owner.changes()) {
        current.setValue('owner', previous.getValue('owner'));
    }
})(current, previous);
`,
})

BusinessRule({
    $id: Now.ID['todo_saved_filter_normalize_before_save'],
    name: 'Todo Saved Filter Normalize Before Save',
    table: 'x_2063979_todo_saved_filter',
    when: 'before',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    description: 'Enforce owner and name defaults for personal todo saved filters.',
    script: `
(function executeRule(current, previous) {
    var name = (current.getValue('name') || '').trim();
    if (!name) {
        gs.addErrorMessage('Saved filter name is required.');
        current.setAbortAction(true);
        return;
    }

    current.setValue('name', name);

    if (current.operation() === 'insert') {
        current.setValue('owner', gs.getUserID());
    } else if (previous && previous.isValidRecord() && current.owner.changes()) {
        current.setValue('owner', previous.getValue('owner'));
    }
})(current, previous);
`,
})
