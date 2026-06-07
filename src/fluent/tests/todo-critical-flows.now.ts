import { Test } from "@servicenow/sdk/core";
import "@servicenow/sdk/global";

const todoUserRole = "x_2063979_todo.user";

export const todoTaskCriticalCrud = Test(
  {
    $id: Now.ID["todo_task_critical_crud_atf"],
    name: "Personal Todo - critical task CRUD",
    description:
      "Verifies task defaults, title normalization, completion, reactivation, and deletion.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    atf.server.createUser({
      $id: Now.ID["todo_crud_create_user"],
      firstName: "Personal Todo",
      lastName: "CRUD ATF",
      fieldValues: {},
      groups: [],
      roles: [todoUserRole],
      impersonate: true,
    });

    const task = atf.server.recordInsert({
      $id: Now.ID["todo_crud_insert_task"],
      table: "x_2063979_todo_task",
      fieldValues: {
        title: "  Critical ATF task  ",
      },
      assert: "record_successfully_inserted",
      enforceSecurity: true,
    });

    atf.server.recordValidation({
      $id: Now.ID["todo_crud_validate_defaults"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues:
        "title=Critical ATF task^status=active^priority=normal^completed=false^due_atISEMPTY",
      assert: "record_validated",
    });

    atf.server.recordUpdate({
      $id: Now.ID["todo_crud_complete_task"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues: { completed: true },
      assert: "record_successfully_updated",
      enforceSecurity: true,
    });

    atf.server.recordValidation({
      $id: Now.ID["todo_crud_validate_completed"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues: "status=completed^completed=true^completed_atISNOTEMPTY",
      assert: "record_validated",
    });

    atf.server.recordUpdate({
      $id: Now.ID["todo_crud_reactivate_task"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues: { completed: false },
      assert: "record_successfully_updated",
      enforceSecurity: true,
    });

    atf.server.recordValidation({
      $id: Now.ID["todo_crud_validate_reactivated"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues: "status=active^completed=false^completed_atISEMPTY",
      assert: "record_validated",
    });

    atf.server.recordDelete({
      $id: Now.ID["todo_crud_delete_task"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      enforceSecurity: true,
    });
  },
);

export const todoOwnerIsolation = Test(
  {
    $id: Now.ID["todo_owner_isolation_atf"],
    name: "Personal Todo - owner isolation",
    description:
      "Verifies a normal user cannot create, update, or delete another user's personal Todo records.",
    active: true,
    failOnServerError: true,
  },
  (atf) => {
    const owner = atf.server.createUser({
      $id: Now.ID["todo_isolation_create_owner"],
      firstName: "Personal Todo",
      lastName: "Owner ATF",
      fieldValues: {},
      groups: [],
      roles: [todoUserRole],
      impersonate: true,
    });

    const task = atf.server.recordInsert({
      $id: Now.ID["todo_isolation_insert_task"],
      table: "x_2063979_todo_task",
      fieldValues: { title: "Owner task" },
      enforceSecurity: true,
    });
    const tag = atf.server.recordInsert({
      $id: Now.ID["todo_isolation_insert_tag"],
      table: "x_2063979_todo_tag",
      fieldValues: { name: "Owner tag", normalized_name: "owner tag" },
      enforceSecurity: true,
    });
    const taskTag = atf.server.recordInsert({
      $id: Now.ID["todo_isolation_insert_task_tag"],
      table: "x_2063979_todo_task_tag",
      fieldValues: { task: task.record_id, tag: tag.record_id },
      enforceSecurity: true,
    });
    const savedFilter = atf.server.recordInsert({
      $id: Now.ID["todo_isolation_insert_saved_filter"],
      table: "x_2063979_todo_saved_filter",
      fieldValues: { name: "Owner filter", filter_state: "{}" },
      enforceSecurity: true,
    });

    atf.server.createUser({
      $id: Now.ID["todo_isolation_create_other_user"],
      firstName: "Personal Todo",
      lastName: "Other ATF",
      fieldValues: {},
      groups: [],
      roles: [todoUserRole],
      impersonate: true,
    });

    atf.server.recordInsert({
      $id: Now.ID["todo_isolation_reject_cross_owner_create"],
      table: "x_2063979_todo_task",
      fieldValues: { owner: owner.user, title: "Cross-owner task" },
      assert: "record_not_inserted",
      enforceSecurity: true,
    });

    atf.server.recordUpdate({
      $id: Now.ID["todo_isolation_reject_task_update"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues: { title: "Unauthorized task update" },
      assert: "record_not_updated",
      enforceSecurity: true,
    });
    atf.server.recordUpdate({
      $id: Now.ID["todo_isolation_reject_tag_update"],
      table: "x_2063979_todo_tag",
      recordId: tag.record_id,
      fieldValues: { name: "Unauthorized tag update" },
      assert: "record_not_updated",
      enforceSecurity: true,
    });
    atf.server.recordUpdate({
      $id: Now.ID["todo_isolation_reject_task_tag_update"],
      table: "x_2063979_todo_task_tag",
      recordId: taskTag.record_id,
      fieldValues: { owner: owner.user },
      assert: "record_not_updated",
      enforceSecurity: true,
    });
    atf.server.recordUpdate({
      $id: Now.ID["todo_isolation_reject_saved_filter_update"],
      table: "x_2063979_todo_saved_filter",
      recordId: savedFilter.record_id,
      fieldValues: { name: "Unauthorized filter update" },
      assert: "record_not_updated",
      enforceSecurity: true,
    });

    atf.server.recordValidation({
      $id: Now.ID["todo_isolation_task_not_readable"],
      table: "x_2063979_todo_task",
      recordId: task.record_id,
      fieldValues: "sys_idISNOTEMPTY",
      assert: "record_not_found",
    });
    atf.server.recordValidation({
      $id: Now.ID["todo_isolation_tag_not_readable"],
      table: "x_2063979_todo_tag",
      recordId: tag.record_id,
      fieldValues: "sys_idISNOTEMPTY",
      assert: "record_not_found",
    });
    atf.server.recordValidation({
      $id: Now.ID["todo_isolation_task_tag_not_readable"],
      table: "x_2063979_todo_task_tag",
      recordId: taskTag.record_id,
      fieldValues: "sys_idISNOTEMPTY",
      assert: "record_not_found",
    });
    atf.server.recordValidation({
      $id: Now.ID["todo_isolation_saved_filter_not_readable"],
      table: "x_2063979_todo_saved_filter",
      recordId: savedFilter.record_id,
      fieldValues: "sys_idISNOTEMPTY",
      assert: "record_not_found",
    });
  },
);
