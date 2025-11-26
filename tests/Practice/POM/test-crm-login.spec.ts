import { test } from "@playwright/test"
import { CRMLogin } from "./CRMLoginPage"


test('CRM Login Page', async ({page})=> {
    const loginPage = new CRMLogin(page)
    
    await loginPage.goto()
    await loginPage.expectedOnPage()
    await loginPage.login('admin@example.com', '123456')
    await loginPage.expectLoggedIn()

})