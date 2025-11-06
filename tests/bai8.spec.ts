import { test, expect } from '@playwright/test';

test('Ví dụ về upload file', async({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name:'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name: '📤 Upload Files'}).click()

    const visible = page.locator('#visible-input')
    await visible.setInputFiles('tests/fixtures/sample1.txt')
    await expect(page.locator("//div[text()='1) Input hiển thị (setInputFiles)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span")
    .nth(1)).toContainText('sample1.txt')

    await page.pause()
})

