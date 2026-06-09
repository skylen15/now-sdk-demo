import { Test } from '@servicenow/sdk/core'
import '@servicenow/sdk/global'

const todoUserRole = 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'

export const todoTaskCriticalCrud = Test(
    {
        $id: Now.ID['todo_task_critical_crud_atf'],
        name: 'Personal Todo - critical task CRUD',
        description: 'Verifies task defaults, title normalization, completion, reactivation, and deletion.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.createUser({
            $id: Now.ID['todo_crud_create_user'],
            firstName: 'Personal Todo',
            lastName: 'CRUD ATF',
            fieldValues: {},
            roles: [todoUserRole],
        })

        const task = atf.server.recordInsert({
            $id: Now.ID['todo_crud_insert_task'],
            table: 'x_2063979_todo_task',
            fieldValues: {
                title: '  Critical ATF task  ',
            },
        })

        atf.server.recordValidation({
            $id: Now.ID['todo_crud_validate_defaults'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: 'title=Critical ATF task^status=active^priority=normal^completed=false^due_atISEMPTY',
            timeout: {
                seconds: 5,
            },
        })

        atf.server.recordUpdate({
            $id: Now.ID['todo_crud_complete_task'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: { completed: true },
        })

        atf.server.recordValidation({
            $id: Now.ID['todo_crud_validate_completed'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: 'status=completed^completed=true^completed_atISNOTEMPTY',
            timeout: {
                seconds: 5,
            },
        })

        atf.server.recordUpdate({
            $id: Now.ID['todo_crud_reactivate_task'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: { completed: false },
        })

        atf.server.recordValidation({
            $id: Now.ID['todo_crud_validate_reactivated'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: 'status=active^completed=false^completed_atISEMPTY',
            timeout: {
                seconds: 5,
            },
        })

        atf.server.recordDelete({
            $id: Now.ID['todo_crud_delete_task'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
        })
    }
)

export const todoOwnerIsolation = Test(
    {
        $id: Now.ID['todo_owner_isolation_atf'],
        name: 'Personal Todo - owner isolation',
        description: "Verifies a normal user cannot create, update, or delete another user's personal Todo records.",
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        const owner = atf.server.createUser({
            $id: Now.ID['todo_isolation_create_owner'],
            firstName: 'Personal Todo',
            lastName: 'Owner ATF',
            fieldValues: {},
            roles: [todoUserRole],
        })

        const task = atf.server.recordInsert({
            $id: Now.ID['todo_isolation_insert_task'],
            table: 'x_2063979_todo_task',
            fieldValues: { title: 'Owner task' },
        })
        const tag = atf.server.recordInsert({
            $id: Now.ID['todo_isolation_insert_tag'],
            table: 'x_2063979_todo_tag',
            fieldValues: { name: 'Owner tag', normalized_name: 'owner tag' },
        })
        const taskTag = atf.server.recordInsert({
            $id: Now.ID['todo_isolation_insert_task_tag'],
            table: 'x_2063979_todo_task_tag',
            fieldValues: { task: task.record_id, tag: tag.record_id },
        })
        const savedFilter = atf.server.recordInsert({
            $id: Now.ID['todo_isolation_insert_saved_filter'],
            table: 'x_2063979_todo_saved_filter',
            fieldValues: { name: 'Owner filter', filter_state: '{}' },
        })

        atf.server.createUser({
            $id: Now.ID['todo_isolation_create_other_user'],
            firstName: 'Personal Todo',
            lastName: 'Other ATF',
            fieldValues: {},
            roles: [todoUserRole],
        })

        atf.server.recordInsert({
            $id: Now.ID['todo_isolation_reject_cross_owner_create'],
            table: 'x_2063979_todo_task',
            fieldValues: { owner: owner.user, title: 'Cross-owner task' },
            assert: 'record_not_inserted',
        })

        atf.server.recordUpdate({
            $id: Now.ID['todo_isolation_reject_task_update'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: { title: 'Unauthorized task update' },
            assert: 'record_not_updated',
        })
        atf.server.recordUpdate({
            $id: Now.ID['todo_isolation_reject_tag_update'],
            table: 'x_2063979_todo_tag',
            recordId: tag.record_id,
            fieldValues: { name: 'Unauthorized tag update' },
            assert: 'record_not_updated',
        })
        atf.server.recordUpdate({
            $id: Now.ID['todo_isolation_reject_task_tag_update'],
            table: 'x_2063979_todo_task_tag',
            recordId: taskTag.record_id,
            fieldValues: { owner: owner.user },
            assert: 'record_not_updated',
        })
        atf.server.recordUpdate({
            $id: Now.ID['todo_isolation_reject_saved_filter_update'],
            table: 'x_2063979_todo_saved_filter',
            recordId: savedFilter.record_id,
            fieldValues: { name: 'Unauthorized filter update' },
            assert: 'record_not_updated',
        })

        atf.server.recordValidation({
            $id: Now.ID['todo_isolation_task_not_readable'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: 'sys_idISNOTEMPTY',
            assert: 'record_not_found',
            timeout: {
                seconds: 5,
            },
        })
        atf.server.recordValidation({
            $id: Now.ID['todo_isolation_tag_not_readable'],
            table: 'x_2063979_todo_tag',
            recordId: tag.record_id,
            fieldValues: 'sys_idISNOTEMPTY',
            assert: 'record_not_found',
            timeout: {
                seconds: 5,
            },
        })
        atf.server.recordValidation({
            $id: Now.ID['todo_isolation_task_tag_not_readable'],
            table: 'x_2063979_todo_task_tag',
            recordId: taskTag.record_id,
            fieldValues: 'sys_idISNOTEMPTY',
            assert: 'record_not_found',
            timeout: {
                seconds: 5,
            },
        })
        atf.server.recordValidation({
            $id: Now.ID['todo_isolation_saved_filter_not_readable'],
            table: 'x_2063979_todo_saved_filter',
            recordId: savedFilter.record_id,
            fieldValues: 'sys_idISNOTEMPTY',
            assert: 'record_not_found',
            timeout: {
                seconds: 5,
            },
        })
    }
)

export const todoSavedFilterCrud = Test(
    {
        $id: Now.ID['todo_saved_filter_crud_atf'],
        name: 'Personal Todo - saved filter CRUD',
        description: 'Verifies owner-scoped saved filter structured-state CRUD.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.createUser({
            $id: Now.ID['todo_saved_filter_create_user'],
            firstName: 'Personal Todo',
            lastName: 'Saved Filter ATF',
            fieldValues: {},
            roles: [todoUserRole],
        })
        const savedFilter = atf.server.recordInsert({
            $id: Now.ID['todo_saved_filter_insert'],
            table: 'x_2063979_todo_saved_filter',
            fieldValues: {
                name: 'Urgent work',
                filter_state:
                    '{"status":"active","due":"upcoming","priority":"urgent","tag":"any","search":"work","sort":"due"}',
            },
        })
        atf.server.recordValidation({
            $id: Now.ID['todo_saved_filter_validate'],
            table: 'x_2063979_todo_saved_filter',
            recordId: savedFilter.record_id,
            fieldValues: 'name=Urgent work^filter_stateLIKEstatus',
            timeout: {
                seconds: 5,
            },
        })
        atf.server.recordUpdate({
            $id: Now.ID['todo_saved_filter_rename'],
            table: 'x_2063979_todo_saved_filter',
            recordId: savedFilter.record_id,
            fieldValues: { name: 'Renamed work' },
        })
        atf.server.recordDelete({
            $id: Now.ID['todo_saved_filter_delete'],
            table: 'x_2063979_todo_saved_filter',
            recordId: savedFilter.record_id,
        })
    }
)

export const todoReminderCrud = Test(
    {
        $id: Now.ID['todo_reminder_crud_atf'],
        name: 'Personal Todo - reminder CRUD',
        description: 'Verifies optional owner-scoped task reminders can be set, changed, and cleared.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        const user = atf.server.createUser({
            $id: Now.ID['todo_reminder_create_user'],
            firstName: 'Personal Todo',
            lastName: 'Reminder ATF',
            fieldValues: {},
            roles: [todoUserRole],
        })
        const task = atf.server.recordInsert({
            $id: Now.ID['todo_reminder_insert_task'],
            table: 'x_2063979_todo_task',
            fieldValues: {
                owner: user.user,
                title: 'Reminder task',
                reminder_at: '2030-01-02 03:04:00',
            },
        })
        atf.server.recordValidation({
            $id: Now.ID['todo_reminder_validate_set'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: 'reminder_atISNOTEMPTY^due_atISEMPTY',
            timeout: {
                seconds: 5,
            },
        })
        atf.server.recordUpdate({
            $id: Now.ID['todo_reminder_change'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: { reminder_at: '2030-02-03 04:05:00' },
        })
        atf.server.recordUpdate({
            $id: Now.ID['todo_reminder_clear'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: {},
        })
        atf.server.recordValidation({
            $id: Now.ID['todo_reminder_validate_clear'],
            table: 'x_2063979_todo_task',
            recordId: task.record_id,
            fieldValues: 'reminder_atISEMPTY',
            timeout: {
                seconds: 5,
            },
        })
    }
)
