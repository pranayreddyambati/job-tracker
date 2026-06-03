export async function login(page, user) {
    await page.goto("http://localhost:5173/");

    await page.fill(".email-input", user.email);

    await page.fill(".password-input", user.password);

    await page.click(".login-button");
}