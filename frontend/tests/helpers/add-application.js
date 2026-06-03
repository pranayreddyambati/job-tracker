export async function add_application(page, application) {
    await page.locator(".add-application").click()
    
    await page.locator(".input-company").fill(application.company)
    
    await page.locator(".input-role").fill(application.role)
    
    await page.locator(".input-location").fill(application.location)
    
    await page.locator(".input-salary").fill(application.salary)
    
    await page.locator(".submit-modal").click()
}