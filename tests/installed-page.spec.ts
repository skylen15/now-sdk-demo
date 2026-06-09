import { expect, test } from "@playwright/test";
import fs from "node:fs";

function loadEnv() {
  if (!fs.existsSync(".env")) return;
  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

loadEnv();
const baseUrl = process.env.SERVICENOW_BASE_URL;
const username = process.env.SERVICENOW_USERNAME;
const password = process.env.SERVICENOW_PASSWORD;

test("installed page supports reminder CRUD", async ({ page }) => {
  test.skip(
    !baseUrl || !username || !password,
    "ServiceNow .env credentials required",
  );
  const title = `Playwright reminder smoke ${Date.now()}`;

  await page.goto(`${baseUrl}/login.do`, { waitUntil: "domcontentloaded" });
  await page.locator("#user_name").fill(username!);
  await page.locator("#user_password").fill(password!);
  await page.locator("#sysverb_login").click({ noWaitAfter: true });
  await page.waitForURL((url) => !url.pathname.endsWith("/login.do"), {
    waitUntil: "commit",
  });

  const sessionCookie = (await page.context().cookies(baseUrl)).find(
    (cookie) => cookie.name === "JSESSIONID" && cookie.value,
  );
  if (!sessionCookie) {
    const loginMessage = await page.locator("body").innerText();
    throw new Error(
      `ServiceNow login did not create a user session. Current URL: ${page.url()}. ` +
        `Page message: ${loginMessage.replace(/\s+/g, " ").slice(0, 500)}`,
    );
  }

  await page.goto(`${baseUrl}/x_2063979_todo_app.do`, {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", { name: "Personal Todo" }),
  ).toBeVisible();
  await page.getByLabel("New task").fill(title);
  await page.getByRole("button", { name: "Add", exact: true }).click();

  const row = page.locator(".todo-row").filter({ hasText: title });
  await expect(row).toBeVisible();
  const reminder = row.locator('input[type="datetime-local"]');
  await reminder.fill("2030-01-02T10:30");
  await expect(row).toContainText("Reminder");
  await reminder.fill("2030-01-03T11:45");
  await expect(reminder).toHaveValue("2030-01-03T11:45");
  await reminder.fill("");
  await expect(reminder).toHaveValue("");

  await row.getByRole("button", { name: "Delete" }).click();
  await page
    .getByRole("dialog", { name: "Confirm delete" })
    .getByRole("button", { name: "Delete", exact: true })
    .click();
  await expect(row).toHaveCount(0);
});
