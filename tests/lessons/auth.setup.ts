import { test as setup, expect } from '@playwright/test';

setup('Tạo User và Login', async ({page})=> {
    console.log('[SETUP] 1. Dang tao user mới trong database ...');
    // Gỉa lập gọi API tạo user mới

    console.log('[SETUP] 2. Đang thực hiện Login...');
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Kiểm tra login thành công
    await expect(page).toHaveURL
})




// setup('setup phu thuocc', async ({ page }) => {
//     await page.goto('https://github.com/login');
//     await page.click('input[name="commit-sign-in"]', { timeout: 5000 });

// })