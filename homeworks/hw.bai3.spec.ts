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

test('Homeword Bai2', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link',{name:'Bài 2: Playwright Locators'}).click()
    await page.getByRole('button', {name:'Playwright getByRole'}).click()
    await page.getByRole('button',{name:'Bài tập'}).click()

    //1. Tìm landmark navigation có tên "Primary" và xác nhận link "Home" là trang hiện tại.
    // await page.getByLabel('Primary').click()
    // await page.getByRole('link', {name: 'Home', exact: true}).click()
    // await expect(page).toHaveURL('https://demoapp-sable-gamma.vercel.app/lesson2#')


    // 2.Điền ô tìm kiếm bằng accessible name "Search docs".
    //await page.getByLabel('Search docs').fill('Search docs')


    // 3. Tương tác với ô nhập được gắn label qua aria-labelledby là "Mã nội bộ".
    // await page.getByLabel('q2-secret-label').fill('Mã nội bộ')

    // 4.Click "Tải dữ liệu" và chờ live region thông báo "Đã tải 3 kết quả".
    // await page.getByRole('button', {name:'Tải dữ liệu'}).click()
    // const stringResult = page.getByRole('status')
   
    await page.getByRole('button',{name:'Load comments'}).click()
    


})