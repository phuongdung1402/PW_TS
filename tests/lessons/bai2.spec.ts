import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.getByRole('button', { name: 'Click Me!' }).click();
  await expect(page.locator('#status')).toContainText('Button Clicked Successfully!');
});


// test.describe('Trang chu playwright.dev', () => {
//     test('TC01. Check menu hien thi DOCS', async ({ page }) => {
//         await page.goto('https://playwright.dev/');
//         await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
//     });
//     test('TC02. Check url cua trang hien thi', async ({ page }) => {
//         await page.goto('https://playwright.dev/');
//         await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
//     });

// })


// test.describe('Trang nhan su anh tester', () => {
//     test('TC01. Kich ban dang nhap va kiem tra widget', async ({ page }) => {
        
//        await test.step('Buoc 1: Dieu huong va dang nhap', async()=>{
//             await page.goto('https://hrm.anhtester.com/erp/login');
//             await page.getByRole('textbox', { name: 'Your Username' }).click();
//             await page.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
//             await page.getByRole('textbox', { name: 'Enter Password' }).click();
//             await page.getByRole('textbox', { name: 'Enter Password' }).fill('123456');
//             await page.getByRole('button', { name: ' Login' }).click();
//        }) 
//        await test.step('Buoc 2: Kiem tra dang nhap thanh cong', async()=>{
//             await expect(page.getByRole('navigation')).toContainText('Your Apps');
//             expect(page.url()).toBe('https://hrm.anhtester.com/erp/desk');
//        })
//     });

// })



// const TARGET_URL = 'https://playwright.dev'
// test('TC01. Demo domcontentloaded', async ({ page }) => {
//     console.log('DEMO WAIT UNTIL- TC01 - domcontentloaded');
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev/', {waitUntil: 'domcontentloaded'});
//     const endTime = performance.now()
//     console.log(`Thoi gian Hoan tat TC01, ${endTime - startTime}`);
//     const rootElement = page.locator('#__docusaurus')
//     await expect(rootElement).toBeAttached()
// });
// // Search (Ctrl+K)
// test('TC02. Demo load', async ({ page }) => {
//     console.log('DEMO WAIT UNTIL - TC02');
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev/');
//     const endTime = performance.now()
//     console.log(`Thoi gian Hoan tat TC02, ${endTime - startTime}`);
    
//     const searchButton = page.getByRole('button', { name: 'Search (Ctrl+K)' })
//     await expect(searchButton).toBeEnabled()
  
// });

// test('TC03. Demo networkidle', async ({ page }) => {
//     console.log('DEMO WAIT UNTIL TC03');
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev/',  {waitUntil: 'networkidle'});
//     const endTime = performance.now()
//     console.log(`Thoi gian Hoan tat TC03, ${endTime - startTime}`);
    
//     //tai thoi diem nay trang da tinh va hoan toan san sang 
//     const searchButton = page.getByRole('button', { name: 'Search (Ctrl+K)' })
//     await expect(searchButton).toBeEnabled()
  
// });