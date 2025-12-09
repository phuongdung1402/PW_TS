import {test, Page} from '@playwright/test'
import { expect } from '@playwright/test'
import { CRMLoginPage } from './pom/CRMLoginPage'
import { CRMDashboardPage } from './pom/CRMDashboardPage'
import { CRMCustomerPage } from './pom/CRMCustomerPage'
import { createMinimalCustomerInfo } from './utils/test-data'
import { CRMNewCustomerPage } from './pom/CRMNewCustomerPage'


test.beforeEach(async ({page})=> {
    const loginPage = new CRMLoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@example.com', '123456');
    await loginPage.expectLoggedIn();
})

function createCRMPages(page: Page) {
    return {
        dashboardPage : new CRMDashboardPage(page),
        customersPage : new CRMCustomerPage(page),
        newCustomerPage : new CRMNewCustomerPage(page)
    }
}

test('TC_CUST_01-Tạo Customer (Chỉ nhập trường bắt buộc)', async ( {page})=> {
    const {dashboardPage, customersPage, newCustomerPage} = createCRMPages(page);

    await test.step('Verify dashboard da load sau khi login', async() => {
        await dashboardPage.expectOnPage()
    })

    await test.step('Navigate to dashboardPage to Customer page', async()=> {
        await dashboardPage.navigateMenu('Customers')
        await customersPage.expectOnPage()
    })

    await test.step('Navigate to customerPage -> new Customer Page', async()=> {
        await customersPage.clickAddNewCustomer()
        await newCustomerPage.expectOnPage()
    })

    const customerInfo = createMinimalCustomerInfo();
    await test.step('Fill required company field', async()=>{
        await newCustomerPage.fillCompany(customerInfo.company)
        await newCustomerPage.clickSaveButton()
    })

    await page.pause()
})