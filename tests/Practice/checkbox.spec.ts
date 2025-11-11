import { test, expect } from '@playwright/test'
import { tr } from 'date-fns/locale'

const URL = 'https://demoapp-sable-gamma.vercel.app/'

test('Ví dụ về checkbox', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click()

    //type='checkbox'
    // await page.locator('#html-checkbox').check()
    // //type= 'radio'
    // await page.locator('#html-radio').click()
    // //role='checkbox'
    // await page.getByRole('checkbox', {name:'ARIA Checkbox'}).check()

    // await page.locator('#demo-checkbox-1').check()
    // await expect(page.locator('#demo-checkbox-1')).toBeChecked()
    // await page.locator('#demo-checkbox-1').uncheck()
    // await expect(page.locator('#demo-checkbox-1')).not.toBeChecked()

    // await page.locator('#demo-checkbox-2').setChecked(true)
    // await expect(page.locator('#demo-checkbox-2')).toBeChecked()
    // await page.locator('#demo-checkbox-2').setChecked(false)
    // await expect(page.locator('#demo-checkbox-2')).not.toBeChecked()

    // await page.locator('#demo-checkbox-3').setChecked(true)
    // await page.locator('#demo-checkbox-3').setChecked(true)
    // await page.locator('#demo-checkbox-3').setChecked(true)
    // await expect(page.locator('#demo-checkbox-3')).toBeChecked()


    //Dùng click
    //await page.locator('#fake-div-status').click()
    //await expect(page.locator('#fake-div-status')).toHaveCSS('color','white')
    // await page.locator('#fake-radio-a').click()
    // await expect(page.locator('#fake-radio-a')).toContainText('✓')
    // await page.locator('#fake-svg-status').click()
    // await expect(page.locator('#fake-svg-status')).toContainText('Checked')

    //BASIC CHECKBOX
    // const optionArr: String[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
    // //Click lần lượt từng checkbox
    // for(let i=0; i<optionArr.length; i++) {
    //     //Click lần lượt từng checkbox
    //     await page.locator(`//div[text() ='Individual Checkboxes']//ancestor::div[@class='ant-card-head']//following-sibling::div//div[@class='ant-space-item']//span[text() = '${optionArr[i]}']`).click()
    //     // Kiểm tra lần lượt từng checkbox
    //     await expect(page.locator(`//div[text()='Current State']//ancestor::div[@class='ant-card-head']//following-sibling::div//div[@class='ant-space-item']//div[text() ='${optionArr[i]}' ]`)).toBeVisible()
    // }

    //Click từng checkbox rồi kiểm tra

    // const allOption: String[] = ['Small', 'Medium', 'Large', 'Extra Large']
    // const optionSelect = 'Medium'
    // for(let i=0;i<radioGroupArr.length;i++) {
    //     await page.locator(`//div[@data-testid='basic-radio-group']//div[@class='ant-space-item']//span[text() = '${radioGroupArr[i]}']`).click()
    //     await expect(page.locator(`//div[@data-testid='basic-radio-group']//div[@class='ant-space-item']//span[text() = '${radioGroupArr[i]}']`)).toBeChecked()
    // }

    // for (const optionName of allOption) {
    //     const radio = page.getByRole('radio', { name: `${optionName}`, exact: true })
    //     if (optionName === optionSelect) {
    //         await radio.check()
    //         await expect(radio).toBeChecked()
    //     } else {
    //         await expect(radio).not.toBeChecked()
    //     }
    // }

    // for (const optionName of allOption) {
    //     const radio = page.getByRole('radio', { name: `${optionName}`, exact: true })

    //     if (optionName === optionSelect) {
    //         await expect(radio).toBeChecked()
    //     } else {
    //         await expect(radio).not.toBeChecked()
    //     }

    // }
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

    //Checkboxgroup - SelectAll

    // const featureAll : String [] = ['Feature 1 ', 'Feature 2 ', 'Feature 3 ', 'Feature 4 ']

    // // select all - verify
    // await page.getByRole('checkbox', {name: 'Select All  '}).check()
    // await expect(page.getByRole('checkbox', {name: 'Select All '})).toBeChecked()
    // for( const feature of featureAll) {
    //     await expect(page.getByRole('checkbox', {name : `${feature}`, exact: true})).toBeChecked()
    // }
    // await expect(page.getByTestId('status-all')).toBeVisible()
    // // unselect All
    // await page.getByRole('checkbox', {name: 'Select All '}).uncheck()
    // await expect(page.getByTestId('status-none')).toBeVisible()

    //select từng phần tử
    // await page.getByTestId('feature-1').click()
    // await expect(page.getByTestId('status-partial')).toBeVisible()

    await page.pause()
})


test('Advanced Scenarios', async ({ page }) => {
    await page.goto(URL)
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '☑️ Checkboxes & Radio' }).click()

    // await page.getByRole('checkbox', {name :'I agree to Terms & Conditions  '}).check()
    // await expect(page.getByRole('checkbox', {name :'I agree to Terms & Conditions  '})).toBeChecked()
    // await expect(page.getByTestId('status-terms-accepted')).toBeVisible()


    // await page.getByRole('checkbox', {name : 'Subscribe to newsletter  '}).check()
    // await expect(page.getByRole('checkbox', {name : 'Subscribe to newsletter  '})).toBeChecked()
    // await expect(page.getByTestId('status-newsletter-subscribed')).toBeVisible()

    // await page.getByRole('checkbox', {name: 'Enable push notifications  '}).check()
    // await expect(page.getByTestId('status-notifications-enabled')).toBeVisible()
    // await page.getByRole('checkbox', {name: 'Enable push notifications  '}).uncheck()
    // await expect(page.getByTestId('status-notifications-disabled')).toBeVisible()

    // await page.getByRole('checkbox', {name :'Allow analytics tracking  '}).check()
    // await expect(page.getByTestId('status-analytics-enabled')).toHaveText('⚠️ Analytics enabled')

    await page.getByRole('radio', { name: 'Light Theme  ' }).check()
    await expect(page.getByTestId('status-theme')).toHaveText('🎨 Light Theme')
    await page.getByRole('radio', { name: 'Dark Theme  ' }).check()
    await expect(page.getByRole('radio', { name: 'Light Theme  ' })).not.toBeChecked()
    await expect(page.getByTestId('status-theme')).toHaveText('🎨 Dark Theme')

    await page.pause()
})
