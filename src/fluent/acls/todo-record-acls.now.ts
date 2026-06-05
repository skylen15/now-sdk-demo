import { Acl } from '@servicenow/sdk/core'
import { todoAdminRole, todoUserRole } from '../roles/todo-roles.now'

const ownerOnlyScript = `
answer = current.getValue('owner') == gs.getUserID();
`

const createOwnerScript = `
var owner = current.getValue('owner');
answer = !owner || owner == gs.getUserID();
`

Acl({
    $id: Now.ID['todo_task_create_owner_acl'],
    type: 'record',
    table: 'x_2063979_todo_task',
    operation: 'create',
    decisionType: 'allow',
    roles: [todoUserRole],
    script: createOwnerScript,
    adminOverrides: false,
    description: 'Allow todo users to create only their own task records.',
})
Acl({
    $id: Now.ID['todo_task_read_owner_acl'],
    type: 'record',
    table: 'x_2063979_todo_task',
    operation: 'read',
    decisionType: 'allow',
    roles: [todoUserRole],
    script: ownerOnlyScript,
    adminOverrides: false,
    description: 'Allow todo users to read only their own task records.',
})
Acl({
    $id: Now.ID['todo_task_write_owner_acl'],
    type: 'record',
    table: 'x_2063979_todo_task',
    operation: 'write',
    decisionType: 'allow',
    roles: [todoUserRole],
    script: ownerOnlyScript,
    adminOverrides: false,
    description: 'Allow todo users to update only their own task records.',
})
Acl({
    $id: Now.ID['todo_task_delete_owner_acl'],
    type: 'record',
    table: 'x_2063979_todo_task',
    operation: 'delete',
    decisionType: 'allow',
    roles: [todoUserRole],
    script: ownerOnlyScript,
    adminOverrides: false,
    description: 'Allow todo users to delete only their own task records.',
})

Acl({ $id: Now.ID['todo_task_create_admin_acl'], type: 'record', table: 'x_2063979_todo_task', operation: 'create', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_task_read_admin_acl'], type: 'record', table: 'x_2063979_todo_task', operation: 'read', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_task_write_admin_acl'], type: 'record', table: 'x_2063979_todo_task', operation: 'write', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_task_delete_admin_acl'], type: 'record', table: 'x_2063979_todo_task', operation: 'delete', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })

Acl({ $id: Now.ID['todo_tag_create_owner_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'create', decisionType: 'allow', roles: [todoUserRole], script: createOwnerScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_read_owner_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'read', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_write_owner_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'write', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_delete_owner_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'delete', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_create_admin_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'create', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_read_admin_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'read', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_write_admin_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'write', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_tag_delete_admin_acl'], type: 'record', table: 'x_2063979_todo_tag', operation: 'delete', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })

Acl({ $id: Now.ID['todo_task_tag_create_owner_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'create', decisionType: 'allow', roles: [todoUserRole], script: createOwnerScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_read_owner_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'read', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_write_owner_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'write', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_delete_owner_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'delete', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_create_admin_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'create', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_read_admin_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'read', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_write_admin_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'write', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_task_tag_delete_admin_acl'], type: 'record', table: 'x_2063979_todo_task_tag', operation: 'delete', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })

Acl({ $id: Now.ID['todo_saved_filter_create_owner_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'create', decisionType: 'allow', roles: [todoUserRole], script: createOwnerScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_read_owner_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'read', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_write_owner_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'write', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_delete_owner_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'delete', decisionType: 'allow', roles: [todoUserRole], script: ownerOnlyScript, adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_create_admin_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'create', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_read_admin_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'read', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_write_admin_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'write', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
Acl({ $id: Now.ID['todo_saved_filter_delete_admin_acl'], type: 'record', table: 'x_2063979_todo_saved_filter', operation: 'delete', decisionType: 'allow', roles: [todoAdminRole], adminOverrides: false })
