import { ApplicationMenu, Record, UiPage } from '@servicenow/sdk/core'
import { todoUserRole } from '../roles/todo-roles.now'
import html from '../../client/index.html'

export const todoAppPage = UiPage({
    $id: Now.ID['todo_app_ui_page'],
    endpoint: 'x_2063979_todo_app.do',
    category: 'general',
    description: 'Personal Todo working list interface.',
    html: html,
    direct: true,
})

const todoMenu = ApplicationMenu({
    $id: Now.ID['todo_app_menu'],
    title: 'Personal Todo',
    hint: 'Personal Todo',
    description: 'Personal task management',
    roles: [todoUserRole],
    active: true,
    category: '',
})

Record({
    $id: Now.ID['todo_app_module'],
    table: 'sys_app_module',
    data: {
        title: 'Todo List',
        application: todoMenu,
        link_type: 'DIRECT',
        query: 'x_2063979_todo_app.do',
        hint: 'Open Personal Todo',
        roles: ['x_2063979_todo.user'],
        active: true,
        order: 100,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
})
