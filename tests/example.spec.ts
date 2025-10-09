import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   const pageTitle = await page.title()
//   console.log(pageTitle);


//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });



test('test', async ({ page, context }) => {
  //Tab 1 : Trang playwright

  const playWrightPage = page
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search' }).fill('L');
  await page.getByRole('searchbox', { name: 'Search' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search' }).fill('Locators');
  console.log('Tab 1 da go locator vao o tim kiem ');


  //Tab2: trang anh tester hrm
  console.log('Dang mo tab2');
  const hrmPage = await context.newPage()

  await hrmPage.goto('https://hrm.anhtester.com/');
  await hrmPage.getByRole('textbox', { name: 'Your Username' }).click();
  await hrmPage.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
  await hrmPage.getByRole('textbox', { name: 'Enter Password' }).click();
  await hrmPage.getByRole('textbox', { name: 'Enter Password' }).fill('password_example');
  console.log('Tab 2 da dien thong tin dang nhap');

  console.log('Back ve tab 1');
  await playWrightPage.getByRole('searchbox', { name: 'Search' }).press('Enter')
  console.log('Tab 1 dang cho ket qua xuat hien');
  await playWrightPage.screenshot({ path: 'screenshots/tab1-playwright.png' })
  await hrmPage.screenshot({ path: 'screenshots/tab2-hrm.png' })

});

// echo "# PW_TS" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/phuongdung1402/PW_TS.git
// git push -u origin main