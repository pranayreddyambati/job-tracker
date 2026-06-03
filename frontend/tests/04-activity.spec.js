import { test, expect } from "@playwright/test";
import { users } from "./data/users";
import { applications } from "./data/applications";

import { login } from "./helpers/login";
import { add_application } from "./helpers/add-application";

const application = applications.oracle

test("activity tracking", async ({ page }) => {
    await login(page, users.activity);

    await expect(page).toHaveURL(/dashboard/);

    await page.locator(".application-nav-link").click()

    await add_application(page, application);

    const firstRow = await page.locator(".application-row").first()

    await firstRow.locator(".application-status-dropdown").selectOption("Interview");

    await page.locator(".activity-button").click();

    await expect(page.locator(".activity-item").filter({hasText: application.company}).first()).toBeVisible();

    await page.locator(".clear-activity-button").click();

    await expect(page.getByText("No activity yet")).toBeVisible();
});