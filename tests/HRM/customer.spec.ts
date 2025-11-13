import { test, expect, Page } from '@playwright/test'
import { format } from 'date-fns'
import { CLIENT_RENEG_LIMIT } from 'tls'

const URL_LOGIN = 'https://crm.anhtester.com/admin'
async function loginAndNavigateToNewCustomer(page: Page, tabName: string) {
    await page.goto(URL_LOGIN)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(' Login ')
    await page.locator("#email").fill('admin@example.com')
    await page.locator("#password").fill('123456')
    await page.keyboard.press("Enter")

    await expect(page).toHaveURL(/admin/)
    await page.locator(`//span[normalize-space(.) = '${tabName}']//parent::a`).click()

    await page.getByRole('link', { name: '+ New Customer' }).click()
    // await expect(page.locator("label[for='company'] small.req")).toBeVisible()
}


async function fillInformationCustomerAndSave(page: Page) {
    const now = new Date()
    const parseTime = format(now, "HH:mm:ss")
    const comName = `dungbtp test ${parseTime}`
    //fill information
    const companyName = page.locator('#company')
    await companyName.fill(comName)

    const companyVat = page.locator('#vat')
    await companyVat.fill('0123456789')

    const companyPhone = page.locator('#phonenumber')
    await companyPhone.fill('0987654321')

    const companyWeb = page.locator('#website')
    await companyWeb.fill('https://dungdungcute@gmail.com.vn')

    const companyAddress = page.locator('#address')
    await companyAddress.fill('TP Hà Nội')

    const companyCity = page.locator('#city')
    await companyCity.fill('HP')

    const companyState = page.locator("#state")
    await companyState.fill('Lê Chân')

    const companyCode = page.locator('#zip')
    await companyCode.fill('1402')

    await page.locator('#default_currency').selectOption('USD')
    await page.locator('#country').selectOption("Jamaica")

    //click save 
    await page.locator('#profile-save-section', {hasText:'Save'}).locator('button', {hasText:'Save'}).nth(1).click()

    //confirm infor
    await expect(companyName).toHaveAttribute('value',comName )
    await expect(companyVat).toHaveAttribute('value','0123456789')
    await expect(companyPhone).toHaveAttribute('value', '0987654321')
    await expect(companyWeb).toHaveAttribute('value', 'https://dungdungcute@gmail.com.vn')
    await expect(companyAddress).toHaveText('TP Hà Nội')
    await expect(companyCity).toHaveAttribute('value', 'HP')
    await expect(companyState).toHaveAttribute('value', 'Lê Chân')
    await expect(companyCode).toHaveAttribute('value', '1402')
}


async function fillInformation(page : Page) {
    const now = new Date()
    const getTime = format(now, 'HH:mm:ss')
    const compName = `dungbtp test ${getTime}`

    await page.locator('#company').fill(compName)
    await page.locator('#address').fill('Số 123 Duy Tân')
    await page.locator('#city').fill('Thành phố Hà Nội')
    await page.locator('#state').fill('Quận Cầu Giấy')
    await page.locator('#zip').fill('12345')

    await page.locator('#country').selectOption('Vietnam')
    await page.locator("//a[normalize-space(.)='Billing & Shipping']").click()
    await page.locator("//a[normalize-space(.)='Same as Customer Info']").click()
    await expect(page.locator('#billing_street')).toHaveAttribute('value', 'Số 123 Duy Tân')

    // const add = page.locator('#billing_street')
    // console.log(add)
}


test.describe('CRM Customer Page - Possitive case', () => {
    test('TC_CUST_01', async ({ page }) => {
        await loginAndNavigateToNewCustomer(page, 'Customers')
        // Dùng filter
        // const containerCompany = page.locator('label', { hasText: 'Company' })
        // //const containerCompany = page.locator('label').filter({hasText :'Company'}) -- tuong tu nhu dong 11
        // const asterik = containerCompany.locator('small', { hasText: '* ' })
        // await expect(asterik).toBeVisible()

        // // await page.locator('#company').fill('Company abc')
        // // //await page.getByRole('button', {name: 'Save', exact:true}).click()
        // // await page.locator("//div[@id='profile-save-section']//button[normalize-space(.)='Save']").click()
        // // await expect(page.locator("#alert_float_1")).toContainText("Customer added successfully.")
        // // await expect(page.locator("//h4[text()='Profile']")).toBeVisible()
        // // await expect(page.locator("//span[@class='tw-truncate']")).toContainText('Company abc')

        // const now = new Date()
        // const parsedDate = format(now, 'HH:mm:ss')
        // const companyName = `Auto PW Company ${parsedDate}`
        // await page.locator('#company').fill(companyName)

        // await page.locator('#profile-save-section').filter({hasText : 'Save'}).locator('button').filter({hasText :'Save'}).nth(1).click()

        // await expect(page.locator("#alert_float_1")).toContainText("Customer added successfully.")

        // const currentUrl = page.url()
        // const urlParst = currentUrl.split('/clients/client/')
        // console.log(urlParst);
        // const customerId = urlParst[1]

        // const expectedDislay = customerId +" "+ companyName
        // console.log(expectedDislay);
        
        // const customerNameDisplay = page.locator('span.tw-truncate')
        // const displayedText = await customerNameDisplay.textContent()
        // console.log(displayedText);
        // expect(displayedText).toContain(expectedDislay)
    })
    test('TC_CUST_02', async ({page})=> {
        await loginAndNavigateToNewCustomer(page, 'Customers')
        await fillInformationCustomerAndSave(page)
    })
})

test.describe('CRM Customer Page - UI/Functionality' , ()=> {

    test('TC_CUST_04', async ({page})=> {
        await loginAndNavigateToNewCustomer(page, 'Customers')
        await fillInformation(page)
        await page.pause()
    })

    test('TC_CUST_05', async ({page})=> {
        await loginAndNavigateToNewCustomer(page, 'Customers')
        //1. Điền company
        await page.locator('#company').fill('Company demo A')

        //2. Click tab "Billing & Shipping".
        await page.getByRole('tab', {name:"Billing & Shipping"}).click()

        //3.Click tab "Billing & Shipping".
        await page.locator('#billing_street').fill('Đường Trần Nguyên Hãn')
        await page.locator('#billing_city').fill('Thành phố Hải Phòng')
        await page.locator('#billing_state').fill('Quận Lê Chân')
        await page.locator('#billing_zip').fill('12345')


        await page.getByRole('link', {name:'Copy Billing Address'}).click()
    
    })

})

test.describe('CRM Customer Page - Negative - Validation', ()=> {
    test('TC_CUST_06', async ({page})=> {
        await loginAndNavigateToNewCustomer(page, 'Customers')
        const urlBanDau =  page.url()
        await page.getByRole('button', {name : 'Save', exact:true}).click()
        expect(page.url()).toBe(urlBanDau)
        // const errorText = page.locator('#company-error').textContent() -- đang lỗi
        // console.log(errorText)
        await page.pause()
    })

    test('TC_CUST_07', async ({page})=> {
         await loginAndNavigateToNewCustomer(page, 'Customers')

           await page.locator('#company').fill('Company A')
           await page.locator("#vat").click()
           //await expect(page.locator('#company_exists_info')).toBeVisible()
           const mess = page.locator("#company_exists_info .alert").textContent()
           console.log(mess)
           await page.pause()


    })

})