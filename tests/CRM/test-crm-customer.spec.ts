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
    }
}


test('TC_01 - Lấy toàn bộ dữ liệu 1 cột sử dụng columnMap', async ( {page})=> {
    const {dashboardPage, customersPage} = createCRMPages(page);

    await test.step('Verify dashboard da load sau khi login', async() => {
        await dashboardPage.expectOnPage()
    })

    await test.step('Navigate to dashboardPage to Customer page', async()=> {
        await dashboardPage.navigateMenu('Customers')
        await customersPage.expectOnPage()
    })

    await test.step('Get all company names using column map', async()=> {
        const companies = await customersPage.getCoumnValues('company')
        console.log(companies)
    })
})


test('TC_02 - Lấy dữ liệu nhiều cột', async ( {page})=> {
    const {dashboardPage, customersPage} = createCRMPages(page);

    await test.step('Verify dashboard da load sau khi login', async() => {
        await dashboardPage.expectOnPage()
    })

    await test.step('Navigate to dashboardPage to Customer page', async()=> {
        await dashboardPage.navigateMenu('Customers')
        await customersPage.expectOnPage()
    })

    await test.step('Get table data with multiple columns', async()=> {
        const data = await customersPage.getTableData(['company', 'phone','active'])
        console.log(data);
        console.table(data)
    })
})
