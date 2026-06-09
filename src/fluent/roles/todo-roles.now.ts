import { Role } from '@servicenow/sdk/core'

export const todoUserRole = Role({
    name: 'x_2063979_todo.user',
    description: 'Can manage only their own Personal Todo records.',
})

export const todoAdminRole = Role({
    name: 'x_2063979_todo.admin',
    containsRoles: [todoUserRole],
    description: 'Can support Personal Todo records across users.',
    scopedAdmin: true,
})
