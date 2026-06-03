import { test, expect } from "@playwright/test";
import { login } from "./helpers/login";
import { users } from "./data/users";


test("analytics page", async ({ page }) => {
    await login(page, users.analytics);

    await expect(page).toHaveURL(/dashboard/);
    
    await page.locator(".analytics-nav-link").click()
    
    await expect(page).toHaveURL(/analytics/);
    
    await expect(page.locator(".analytics-stats-card")).toHaveCount(4);
    
    await expect(page.locator(".status-chart")).toBeVisible();
    
    await expect(page.locator(".trend-chart")).toBeVisible();
    
    await page.locator(".dashboard-nav-link").click()
    
    await expect(page).toHaveURL(/dashboard/);
});