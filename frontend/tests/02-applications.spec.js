import { test, expect } from "@playwright/test";
import { users } from "./data/users";
import { applications } from "./data/applications";
import { login } from "./helpers/login";
import { add_application } from "./helpers/add-application";

const application = applications.oracle

test("add application", async ({ page }) => {
    await login(page, users.applications);

    await expect(page).toHaveURL(/dashboard/);

    await page.locator(".application-nav-link").click()


    await add_application(page, application);

    const firstRow = await page.locator(".application-row").first()

    await expect(firstRow).toContainText(application.company)
    await expect(firstRow).toContainText(application.role)

    await firstRow.locator(".application-status-dropdown").selectOption("Interview");
    await expect(firstRow.locator(".application-status-dropdown")).toHaveValue("Interview");

    await firstRow.locator(".application-status-dropdown").selectOption("Offer");
    await expect(firstRow.locator(".application-status-dropdown")).toHaveValue("Offer");

    page.once("dialog", async (dialog) => {

        expect(dialog.type())
            .toBe("confirm");

        expect(dialog.message())
            .toBe(
                "Delete this application?"
            );

        await dialog.accept();
    });

    await firstRow
        .locator(".delete-application-button")
        .click();

    await expect(
        page.locator("tbody")
    ).not.toContainText(application.company);
})