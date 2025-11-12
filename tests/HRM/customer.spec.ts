import { test, expect, Page } from '@playwright/test'
import { format } from 'date-fns'

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


async function fillInformationCustomer(page: Page) {
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
    await expect(companyAddress).toHaveAttribute('value', 'TP Hà Nội')
    await expect(companyCity).toHaveAttribute('value', 'HP')
    await expect(companyState).toHaveAttribute('value', 'Lê Chân')
    await expect(companyCode).toHaveAttribute('value', '1402')


}


test.describe('CRM Customer Page - Possitive case', () => {
    test('TC_CUST_01', async ({ page }) => {
        await loginAndNavigateToNewCustomer(page, 'Customers')
        await fillInformationCustomer(page)

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
        await page.pause()
    })





})
