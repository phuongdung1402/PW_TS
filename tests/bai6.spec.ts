// import { test, expect } from '@playwright/test';

// test('ví dụ về các loại click trong PW', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');

//   await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
//   await page.locator('//span[text()="Click Me"]').click();

//   await page.locator('//span[text()="Double Click Me"]').dblclick();

//   await page.locator('//span[text()="Right Click Me"]').click({ button: 'right' });

//   await page.pause();
// });


// test('hover trong PW', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
//   await page.locator('//div[text()="Hover để xem tooltip"]').nth(0).hover();
//   const toolTip = await page.locator('//div[@class="ant-tooltip-inner"]').innerText();
//   console.log(toolTip);
//   await expect(page.getByRole('tooltip')).toBeVisible();
//   await page.pause();
// });