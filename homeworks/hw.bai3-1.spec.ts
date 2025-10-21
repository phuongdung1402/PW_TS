import { test, expect } from '@playwright/test';


//test('Homeword Bai1', async ({page})=>{
// await page.goto('https://demoapp-sable-gamma.vercel.app/')
// await page.getByRole('link',{name:'Bài 2: Playwright Locators'}).click()
// await page.getByRole('button', {name:'Playwright getByRole'}).click()
// await page.getByRole('button',{name:'Bài tập'}).click()

// 1.Chọn nút Bold đang bật (aria-pressed=true).
// await page.getByRole('button', {name:'Bold'}).click()

// 2.Mở menu "More options" và chọn mục "Duplicate".
// await page.getByRole('button', {name:'More options'}).click()
// await page.getByRole('menuitem',{name:'Duplicate'}).click()

// 3.Xác nhận mục "Download" ở menu đang disabled.
// await page.getByRole('button', {name:'More options'}).click()
// await page.getByRole('menuitem', {name:'Download (disabled)', disabled:true}).hover()

// 4.Mở combobox "Font family" và chọn option "Roboto" (aria-selected).
// await page.getByRole('combobox', {name:'Font family'}).click()
// await page.getByRole('option', {name:'Roboto'}).click()


// 5.Điền textbox "Tiêu đề" bằng giá trị: Bài viết mới.Khẳng định nút "Publish" đang disabled.
// await page.locator("#q5-title").fill('Bài viết mới')
// const publishBtn = page.getByRole('button', {name:'Publish'})
// await expect(publishBtn).toBeDisabled()

//})

// test('Homeword Bai2', async ({ page }) => {
//     await page.goto('https://demoapp-sable-gamma.vercel.app/')
//     await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
//     await page.getByRole('button', { name: 'Playwright getByRole' }).click()
//     await page.getByRole('button', { name: 'Bài tập' }).click()

//1. Tìm landmark navigation có tên "Primary" và xác nhận link "Home" là trang hiện tại.
// const nav = await page.getByLabel('Primary')
// await expect(nav).toBeAttached()
// await page.getByRole('link', {name: 'Home', exact: true}).click()
// await expect(page).toHaveURL('https://demoapp-sable-gamma.vercel.app/lesson2#')


// 2.Điền ô tìm kiếm bằng accessible name "Search docs".
//await page.getByLabel('Search docs').fill('Search docs')



// 3. Tương tác với ô nhập được gắn label qua aria-labelledby là "Mã nội bộ".
//await page.locator('[aria-labelledby="q2-secret-label"]').fill('Mã nội bộ')


// 4.Click "Tải dữ liệu" và chờ live region thông báo "Đã tải 3 kết quả".
// await page.getByRole('button', {name:'Tải dữ liệu'}).click()
// const result = page.locator('[role="status"]')
// await expect(result).toContainText('Đã tải 3 kết quả')

//})


// test('Homeword Bai3', async ({ page }) => {
//     await page.goto('https://demoapp-sable-gamma.vercel.app/')
//     await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
//     await page.getByRole('button', { name: 'Playwright getByRole' }).click()
//     await page.getByRole('button', { name: 'Bài tập' }).click()

//1.Click "Load comments" và kiểm tra aria-busy trên khu vực comments chuyển đúng trạng thái.
// await page.getByRole('button', {name:'Load comments'}).click()
// const ariaText = page.locator('#q3-busy')
// await expect(ariaText).toContainText('true')

//2.Chờ danh sách comment xuất hiện và đếm đúng 3 phần tử listitem.
// await page.getByRole('button', {name:'Load comments'}).click()
// const cmtList = page.locator('ul[role="list"]')
// await expect(cmtList).toBeVisible()
// const cmtNumber = await page.locator('li[role="listitem"]').count()
// console.log(cmtNumber)

//3.Dùng nth() để chọn comment thứ 2 chứa text "Comment B".
// const soLuongListItem = await page.locator('div[role="listitem"]').count()
// console.log(soLuongListItem)
// await page.locator('div[role="listitem"]').nth(1).click()
//})


//test('Homeword Bai4', async ({ page }) => {
// await page.goto('https://demoapp-sable-gamma.vercel.app/')
// await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
// await page.getByRole('button', { name: 'Playwright getByRole' }).click()
// await page.getByRole('button', { name: 'Bài tập' }).click()

//1.Click nút "Self remove" và xác nhận nút biến mất (toHaveCount(0)).
// const SelfRemoveBTN = page.locator('#q4-self-remove')
// await SelfRemoveBTN.click()
// const num = await SelfRemoveBTN.count()
// expect(num).toEqual(0)

//2.Kiểm tra nút "Danger submit" bị disabled và ô "Readonly token" có thuộc tính readonly.
// const dangerSubmitBtn = page.getByLabel('Danger submit')
// await expect(dangerSubmitBtn).toBeDisabled()

// const readOnlyToken = page.getByLabel('Readonly token')
// await expect(readOnlyToken).toHaveAttribute('readonly')

//3.Click "Trigger error" và xác nhận alert hiển thị nội dung lỗi.
//     await page.getByRole('button', {name:'Trigger error' }).click()
//     const messageError =  await page.locator('#q4-error-box')
//     await expect(messageError).toHaveText('Đã có lỗi xảy ra')


// })