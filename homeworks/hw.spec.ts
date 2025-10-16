import { test, expect } from '@playwright/test';

test.describe('Testing Homework', () => {
    test('TC1.Test function nâng cao', async ({ page }) => {
        await page.goto('https://demoapp-sable-gamma.vercel.app/');
        await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
        await page.getByRole('button', { name: 'Nâng cao' }).click();
        await page.getByRole('checkbox', { name: 'Tôi đồng ý với các điều khoản' }).check();
        const btnContinue = page.getByRole('button', {name: 'Tiếp tục'});
        await expect(btnContinue).toBeEnabled();
        await btnContinue.click();
        const textWelcome = page.getByRole('heading',{name: 'Chào mừng bạn đã quay trở lại!'});
        await expect(textWelcome).toBeEnabled();

    })
})