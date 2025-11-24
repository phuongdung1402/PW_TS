import { test } from "@playwright/test"
import { CRMLoginPage } from "./pom/CRMLoginPage"
import { expect } from "@playwright/test"
import { CRMDashboardPage } from "./pom/CRMDashboardPage"


test('CRM Login Page - Login thanh cong', async ({page})=> {
    //arrange: khởi tạo điều kiện cần thiết
    const loginPage = new CRMLoginPage(page)
    const dashboardPage = new CRMDashboardPage(page)

    await loginPage.goto()
    await loginPage.expectOnPage();

    //Actions : thực hiện actions   
    await loginPage.login('admin@example.com','123456')

    //assert
    //await expect(page).toHaveURL(/admin/)
    await dashboardPage.expectOnPage();
})