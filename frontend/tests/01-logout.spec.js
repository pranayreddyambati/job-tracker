import {test, expect} from "@playwright/test";
import { users } from "./data/users";
import { login } from "./helpers/login";
 
test("user can login and logout", async ({ page }) => {
    await login(page, users.dashboard);
    
    await expect(page.locator(".profile-email")).toHaveText(users.dashboard.email);
    
    await page.click(".logout-button");

})