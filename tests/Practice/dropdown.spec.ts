
import { test, expect, Page } from '@playwright/test'
const URL = 'https://demoapp-sable-gamma.vercel.app/'

test('Demo dropdown', async ({ page }) => {
    await page.goto(URL)
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click()
    await page.getByRole('combobox', { name: 'Strict fruits combobox' }).click()

    await expect(page.locator('#lib-strict-menu')).toBeVisible()
    await page.locator("//div[@id='lib-strict-menu']//div[text() = 'Cherry']").click()
    await expect(page.locator('#lib-strict-value')).toHaveText('Cherry')
    await page.pause()
})

test('Dropdown có thẻ <select>', async ({ page }) => {
    await page.goto(URL)
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click()
    const countrySelect = page.locator('#country-select')
    await countrySelect.scrollIntoViewIfNeeded()
    // await countrySelect.selectOption('Vietnam')
    await countrySelect.selectOption({ value: 'United States' })
    await expect(countrySelect).toHaveValue('United States')
    await page.pause()
})

test('Dropdown không có thẻ <select>', async ({ page }) => {
    await page.goto(URL)
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click()
    await page.getByRole('button', { name: 'Fruit:Select fruit' }).click()

    await expect(page.locator('.cd-menu')).toBeVisible()
    await page.locator('.cd-menu li').nth(0).click()
    await expect(page.locator("//div[@class='cd-trigger']//span[text()='Fruit:']//following-sibling::span")).toHaveText('Apple')

    //Đóng dropdown & chọn lại
    await page.locator("//span[text()='Fruit:']//parent::div").click()
    await expect(page.locator("//span[text()='Fruit:']//parent::div//following-sibling::ul")).toBeVisible()
    await page.locator("//span[text()='Fruit:']//parent::div//following-sibling::ul//li[text()='Banana']").click()
    await expect(page.locator("//span[text()='Fruit:']//following-sibling::span")).toHaveText('Banana')
    await page.pause()

})

async function selectOptionArr(page : Page, optionName : string []) {
    const trigger = page.locator("div[class='custom-dropdown large'] > div[class='cd-trigger']")
    const menu = page.locator("div[class='custom-dropdown large'] > ul[class='cd-menu']")

    if(!(await menu.isVisible())) {
        await trigger.click()
        await menu.waitFor({state : 'visible'})
    }

    for(const name of optionName) {
        const item = page.locator("div[class='custom-dropdown large'] > ul[class='cd-menu'] > li", {hasText : `${name}`})
        await item.scrollIntoViewIfNeeded()
        await item.click()
    }

    // đóng dropdown 
    await trigger.click()
    await expect(menu).toBeHidden()
}
test('Dropdown large', async ({ page }) => {
    await page.goto(URL)
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click()
    await selectOptionArr(page, ['Mexico', 'Samoa', 'Thailand', 'Angola'])
    // await page.locator("//div[@class='custom-dropdown large']//div[@class='cd-trigger']").click()
    //await expect(page.locator('.cd-menu')).toBeVisible()

    //C1 : Dùng scrollintoView
    // const countriesOption = ['Belize', 'Angola', 'Haiti', 'Morocco','Samoa', 'Thailand']
    // for( const country of countriesOption) {
    //     const option = page.locator(`//div[@class='custom-dropdown large']//div[@class='cd-trigger']//following-sibling::ul/li/span[text()='${country}']`)
    //     //await option.scrollIntoViewIfNeeded()
    //     await option.click()
    // }

    // C2 : Dùng mouse.wheel
    // for (let i = 0; i < 5; i++) {
    //     await page.mouse.wheel(0, 300); // deltaY = 300px xuống
    //     await page.waitForTimeout(100); // Đợi scroll xong
    // }
    //await page.locator("//div[@class='custom-dropdown large']//div[@class='cd-trigger']//following-sibling::ul/li/span[text()='Zimbabwe']").click()


    // C3 : Dùng keyboard navigation - Arrow keys (  đang ko chạy được )
    // const countryList = page.locator('.cd-menu')
    // await countryList.focus()
    // for(let i=0;i<20;i++) {
    //     await page.keyboard.press('ArrowDown')
    //     await page.waitForTimeout(50);
    // }
    // await page.keyboard.press('Enter')

    // C4 : 
    // await page.locator('.cd-trigger', {hasText : 'Countries:'}).nth(0).click()
    // const item = page.locator("//span[text()='Countries:']//ancestor::div[@class='cd-trigger']//following-sibling::ul//li//span[text() = 'Mexico']")
    // await item.scrollIntoViewIfNeeded()
    // await item.hover()
    // await item.click()
    await page.pause()
})


test('Filterable Dropdown', async ({page})=> {
    await page.goto(URL)
    await page.getByRole('link', {name : 'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name : '☑️ Checkboxes & Radio'}).click()

    const trigger = page.locator("//div[@class='custom-dropdown filter']//div[@class='cd-trigger']")
    const inputText = page.locator("//div[@class='custom-dropdown filter']//div[@class='cd-trigger']/following-sibling::div//input")

    // Mở dropdown
    await trigger.click();
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Search theo text cho trước
    // await inputText.fill('land')
    // const item = page.locator("//div[@class='custom-dropdown filter']//div[@class='cd-trigger']/following-sibling::div//ul/li", {hasText:'Iceland'})
    // await item.scrollIntoViewIfNeeded()
    // await item.click()

    // Ko nhập text
    await trigger.locator("xpath=.//following-sibling::div/ul/li", {hasText:'Taiwan'}).click()




    // Đóng dropdown bằng cách click tiếp vào dropdown 
    await trigger.click()
    await page.pause()






})
