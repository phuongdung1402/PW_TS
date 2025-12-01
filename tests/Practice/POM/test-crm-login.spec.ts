import { CRMLoginPage } from "./CRMLoginPage"
import {test} from '@playwright/test'



test('CRM Login Page - Login thanh cong', async ({page})=> {
    const loginPage = new CRMLoginPage(page)
    
    await loginPage.goto()
    await loginPage.expectOnPage()
    await loginPage.login('admin@example.com', '123456')

    await loginPage.expectLoggedIn()

})