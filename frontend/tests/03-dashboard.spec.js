import { test, expect } from "@playwright/test"
import { login } from "./helpers/login";
import { add_application } from "./helpers/add-application";
import { users } from "./data/users";
import { applications } from "./data/applications";

const application = applications.oracle

test("check dashboard", async ({ page }) => {
    await login(page, users.dashboard);

    await expect(page).toHaveURL(/dashboard/);
    
    await expect(page.locator(".profile-email")).toContainText(users.dashboard.email);
    
    await expect(page.locator(".dashboard-card")).toHaveCount(5);

    await expect(page.locator(".status-chart")).toBeVisible();
    
    await expect(page.locator(".trend-chart")).toBeVisible();
    
    await expect(page.locator(".recent-applications-table")).toBeVisible();
    
    await add_application(page, application);
    
    const firstRow = await page.locator(".recent-applications-row").first();
    
    await expect(firstRow).toContainText(application.company);
    
    await page.locator(".analytics-nav-link").click()
    
    await expect(page).toHaveURL(/analytics/);
    
    await page.locator(".dashboard-nav-link").click()
    
    await expect(page).toHaveURL(/dashboard/);

    const before = await page.locator("html").getAttribute("class");
    
    await page.locator(".dark-mode-toggle").click();
    
    const after = await page.locator("html").getAttribute("class");

    expect(after).not.toBe(before);
})