import {test} from './fixture/gatekeeper.fixture'
import { expect } from '@playwright/test'
import { createMinimalCustomerInfo } from './utils/test-data'




test('TC_CUST_01-Tạo Customer (Chỉ nhập trường bắt buộc)', async ( {dashboardPage, customersPage, newCustomerPage})=> {


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
})