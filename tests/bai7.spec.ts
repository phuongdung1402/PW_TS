import { test, expect } from '@playwright/test';

// locator.check() => đảm bảo ô đc check. ( nếu đã check -> ko làm gì cả)
// locator.uncheck() =>đảm bảo ô bị uncheck ( nếu đã bỏ check -> thì ko làm gì cả)
// locator.setCheck(boolean) :

//const shouldBeCheck = true
//await page.locator.setCheck(shouldBeCheck) -> luôn đảm bảo cho radio hoặc checkbox được check
//Áp dụng cho các thẻ có type radio , checkbox

test('Ví dụ về checkbox', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name : 'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name : '☑️ Checkboxes & Radio'}).click()

    // checkbox 1 : check() / uncheck()
    // await page.locator('#demo-checkbox-1').check()
    // await expect(page.locator('#demo-checkbox-1')).toBeChecked()

    // await page.locator('#demo-checkbox-1').uncheck()
    // await expect(page.locator('#demo-checkbox-1')).not.toBeChecked()

    // // Checkbox 2 : setChecked (true/false)
    // await page.locator('#demo-checkbox-2').setChecked(true)
    // await expect(page.locator('#demo-checkbox-2')).toBeChecked()

    // await page.locator('#demo-checkbox-2').setChecked(false)
    // await expect(page.locator('#demo-checkbox-2')).not.toBeChecked()

    // // checkbox 3 : Idempotent -- Gọi lại nhiều lần an toàn
    // await page.locator('#demo-checkbox-3').setChecked(true)
    // await page.locator('#demo-checkbox-3').setChecked(true)
    // await expect(page.locator('#demo-checkbox-3')).toBeChecked()

    await page.pause()
})



test('Ví dụ về dropdown', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name : 'Bài 4: Mouse Actions'}).click()
    const panel =  page.getByRole('tab', {name : '☑️ Checkboxes & Radio'}).click()

    // const dropdownLocator = page.locator('#country-select')
    
    // //await dropdownLocator.selectOption('Vietnam')
    //  await dropdownLocator.selectOption({index : 3})

    await page.locator("//div[contains(text(), 'Custom Dropdown (Không dùng <select>)')]/ancestor::div[@class='ant-card-head']/following-sibling::div//div[@class='cd-trigger']").click()
    



    await page.pause()

})