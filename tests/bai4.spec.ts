import { test, expect } from '@playwright/test';
// Ở trong pw có 3 cấp độ kiểm soát timeOut
//1 Cấp độ cao nhất Inline timeout ( define trực tiếp timeOut trong hành động click())
//2 Cấp độ trung bình = actionTimeout (setup trong file playwright.config -> use {})
//3 Cấp độ thấp nhất => toàn cục 

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/'


// Cấp 1 : Mệnh lệnh của sếp ( cấp độ cao nhất)
// test('Cấp 1 : Mệnh lệnh của sếp', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.locator('//button[@type="button"]/span[contains(text(),"Bắt đầu Test")]').click()
//   const slowButton1 = page.locator('#button-1')
//   await slowButton1.click({timeout: 7000})
//  // await page.pause()
// });


//Cấp 2 : Giới hạn của phòng ban ()
// test('Cấp 2 : Giới hạn của phòng ban', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.locator('//button[@type="button"]/span[contains(text(),"Bắt đầu Test")]').click()
//   const slowButton2 = page.locator('#button-2')
//   await slowButton2.click()
// });


// Cấp 3 : Giới hạn của của cty 
// test('Cấp 3 : Giới hạn của công ty', async ({ page }) => {
//     await page.goto(DEMO_URL);
//     await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//     const startBtn = page.locator('#start-btn')
//     const continueBtn = page.locator('#continue-btn')
//     const expectedBtn = page.locator('#final-btn')
//     //actionTimeout 10s mà tiến trình có 8s thì thoải mái
//     await startBtn.click()
//     // 8s < 10s thỏa mãn
//     await continueBtn.click()
//     // tổng phải chờ là 16s
//     await expectedBtn.click()
// });


// test.setTimeout(8000)
// //TC chạy pass khi set lại timeout toàn cục
// test('Set lại timeout', async ({ page }) => {
//     await page.goto(DEMO_URL);
//     await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

//     const startBtn = page.locator('#start-btn')
//     const continueBtn = page.locator('#continue-btn')
//     const expectedBtn = page.locator('#final-btn')

//     //actionTimeout 10s mà tiến trình có 8s thì thoải mái
//     await startBtn.click()
//     // 8s < 10s thỏa mãn
//     await continueBtn.click()

//     // tổng phải chờ là 16s
//     await expectedBtn.click()
// });

//---------------------------------------------------------------------------------------------
//Web frist assertions
//có 2 cấp độ : 
// Cấp độ 1 : Inline timeout => mệnh lệnh tối cao
// Cấp độ 2 : toàn cục -> quy định chung

// Cấp 1 : web first assertion
// test('Cấp 1 : Webfirst assertion', async ({ page }) => {

//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//    await page.getByRole('button', { name: 'Web-First Assertions' }).click();
//   await page.getByText('Bắt đầu chờ').click()
//   const statusMessage = page.locator('#status-message')

//   await expect(statusMessage).toHaveText('Tải dữ liệu thành công!', {timeout:8000})

// });

// Cấp 2 : web first assertion (config trong file PW.config ->expect :{timeout : 6000})
// test('Cấp 2: Webfirst assertion', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'Web-First Assertions' }).click();
//   await page.getByText('Bắt đầu chờ').click();
//   const statusMessage = page.locator('#status-message');
//   //thằng PW sẽ cơ chế retry để đảm bảo là sau x giây locator sẽ đc expect nhưu mong muốn. nếu ko thì sẽ văng timeout
//   await expect(statusMessage).toHaveText('Tải dữ liệu thành công!');
// });

// test('Webfirst assertion passed', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'Web-First Assertions' }).click();
//   await page.getByText('Bắt đầu chờ').click();
//   const statusMessage = page.locator('#status-message');
//   //thằng PW sẽ cơ chế retry để đảm bảo là sau x giây locator sẽ đc expect nhưu mong muốn. nếu ko thì sẽ văng timeout
//   await expect(statusMessage).toHaveText('Tải dữ liệu thành công!', { timeout: 8000 });
// });


//toBeAttached
//kiểm tra phần tử có tồn tại trong DOM hay không . nó ko quan tâm có hiển thị trên màn hình hay ko

// test('tobeAttached', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'expect() có await' }).click();
//   await page.locator('#btn-attach').click();

//   //đợi 5s để phần tử đc gắn vào DOM
//   await expect(page.locator('#attached-node')).toBeAttached();
// });

//toBeVisible
// Kiểm tra phần tử vừa tồn tại trong DOM và vừa đang hiển thị trên màn hình
// ko có display bằng non

// test('toBeVisible', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'expect() có await' }).click();
//   await page.locator('#btn-hide').click();
//    await page.locator('#btn-show').click();

//   //đợi 5s để phần tử đc gắn vào DOM
//   await expect(page.locator('#visibility-target')).toBeVisible();
// });

//toBeHidden
//là phủ định của visible -> check ko có trong DOM hoặc hiển thị

// test('toBeHidden', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'expect() có await' }).click();
//   await page.locator('#btn-hide-for-hidden').click();

//   await expect(page.locator('#hidden-target')).toBeHidden();
// });

// test('tobeChecked', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: "Bài 1: Auto-Wait Demo"}).click()
//     await page.getByRole('button', {name:" expect() có await"}).click()
//     const btnCheck = await page.locator('#radio-option')
//     await btnCheck.click()
//     await expect(btnCheck).toBeChecked()

// })

// test('tobeChecked 2', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: "Bài 1: Auto-Wait Demo"}).click()
//     await page.getByRole('button', {name:" expect() có await"}).click()
//     await page.locator('#news-check').click()
//     await expect(page.locator('#news-check')).toBeChecked()

// })


// test('Tab Check', async ({page}) => {
//         await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: "Bài 1: Auto-Wait Demo"}).click()
//     await page.getByRole('button', {name:" expect() có await"}).click()
//     await page.locator('#tab-option').click()
//     const trangThai = await (page.locator('#tab-option').getAttribute('aria-selected'))
//     expect(trangThai).toBeTruthy()
// })

// test('Selection Option', async ({page})=>{
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: "Bài 1: Auto-Wait Demo"}).click()
//     await page.getByRole('button', {name: " expect() có await"}).click()
//     await page.locator('#select-option option[value="option2"]').click()
//     await expect(page.locator('#select-option option[value="option2"]')).toBeChecked()
// })


// test('toBeDisabled', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'expect() có await' }).click();
//   await page.pause();
//   //ẩn dialog
//   await page.locator('#toggle-disabled').click();
//   await expect(page.locator('#email')).toBeDisabled();
// });

//toBeEnable
//Phần tử ko bị vô hiệu hóa và có thể tương tác được ( phủ định của disable)
// test('toBeEnable', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'expect() có await' }).click();

//   await page.locator('#toggle-enabled').dblclick();
//   await expect(page.locator('#enabled-input')).toBeEnabled();
// });


//toBeEditable
// test('toBeEditable', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//   await page.getByRole('button', { name: 'expect() có await' }).click();

//   await expect(page.locator('#editable')).toBeEditable();
// });


//toBeEmpty
// test('toBeEmpty', async ({ page }) => {
//     await page.goto(DEMO_URL);
//     await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//     await page.getByRole('button', { name: 'expect() có await' }).click();
//     await page.locator('#btn-clear').click();

//     await expect(page.locator('#empty-box')).toBeEmpty();
// });


//toHaveCount : check có chứa chính xác bn phần tử
// test('toHaveCount', async ({ page }) => {
//     await page.goto(DEMO_URL);
//     await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//     await page.getByRole('button', { name: 'expect() có await' }).click();


//     await expect(page.locator('#items li')).toHaveCount(2);
// });

//toContainText
//Kiểm tra nội dung text của phần tử, ko phân biệt hoa thường , và tự chuẩn hóa khoảng trắng
// test('toContainText', async ({ page }) => {
//     await page.goto(DEMO_URL);
//     await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//     await page.getByRole('button', { name: 'expect() có await' }).click();
//     //await page.locator('#btn-set-complex-text').click()
//     await page.locator('#btn-set-whitespace').click();
//    // await expect(page.locator('#text-container')).toContainText('john')
//     await expect(page.locator('#text-container')).toContainText('multiple spaces')
// });

//toBeFocused
// check focus vao input con tro chuot nhap nhay
// test('toBeFocused', async ({ page }) => {
//     await page.goto(DEMO_URL);
//     await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
//     await page.getByRole('button', { name: 'expect() có await' }).click();
//     await page.locator('#btn-focus').click();
//     await expect(page.locator('#focusable')).toBeFocused();


// });

//toHaveValue
//
// test('toHaveValue', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator("//span[text()='Set Value']").click()
//     await expect(page.locator('#value-input')).toHaveValue('Hello World')
// })


// test('toHaveValues', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator("//span[text()='Set Values']").click()
//     await expect(page.locator('#multi-select')).toHaveValues(['Action', 'Drama'])
// })

// test('toContainClass', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator("#btn-toggle-class").click()
//     await expect(page.locator('#class-target')).toContainClass('highlight')
// });


// test('toHaveClass', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator("#btn-toggle-exact-class").click()
//     await expect(page.locator('#exact-class-target')).toHaveClass('highlight')

// })


// test('toHaveAttribute', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator("#btn-toggle-attr").click()
//     await expect(page.locator('#avatar')).toHaveAttribute('alt', 'User Avatar')

// })


// test('toHaveId', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await expect(page.locator('#unique-id')).toHaveId('unique-id')
// })



// test('toHaveInViewPoint', async ({page})=> {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
//     await page.getByRole('button', {name: 'expect() có await'}).click()
//     await page.locator('#viewport-target').scrollIntoViewIfNeeded()
//     await expect(page.locator('#viewport-target')).toBeInViewport()
// })


test('toHaveInViewPoint', async ({page})=> {
    await page.goto(DEMO_URL)
    await page.getByRole('link', {name: 'Bài 1: Auto-Wait Demo'}).click()
    await page.getByRole('button', {name: 'expect() có await'}).click()
    await page.locator('#btn-whitespace-text').click()
    //const expectedMessage = page.locator('#status-text')
    //await expect(expectedMessage).toContainText('Data loaded successfully!')

    const expectedMess = page.locator('#status-text div div').nth(1)
    await expect(expectedMess).toHaveText('Data loaded successfully!')
})