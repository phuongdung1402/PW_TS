import { test, expect } from '@playwright/test';

//web accessibility ( kha nang tiep can ) - nen tang cua getByRole
//getByRole cua PW : se xac dinh nhung the HTML co cau truc nhu the nao => theo vai tro ngam dinh
//type Locator : giong như 1 inteface / type alias ( có nhiều hàm xử lý )


test('Vai tro ngam dinh', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
    await page.getByRole('button', { name: 'Playwright getByRole' }).click()

    // const linkLocator = page.getByRole('link', {name: 'Trang chủ'})
    // //count : dem so phan tu trong DOM tree
    // console.log('Phan tu o tren web : ', await linkLocator.count());
    // //nth : lay phan tu o index ? 
    // await linkLocator.nth(0).hover()

    // //linkLocator.hover()
    // //await linkLocator.highlight()
    // await page.pause()
    // //linkLocator.click()

    //await page.getByRole('button', {name:'Lưu'}).click()
    // await page.getByRole('textbox', {name:'Tên: '}).fill('phuong dung')
    // await page.pause()

    //press : ấn Enter 
    //fill : fill text , pressSequentially : bấm từng phím 

    // await page.getByRole('checkbox', {name:' Đồng ý điều khoản'}).click()
    // await page.getByRole('radio',{name:' Nam'}).check()


    // await page.getByRole('textbox', {name:'Email: '}).fill('phdung1402@gmail.com')
    // await page.getByRole('textbox', {name:'Mật khẩu: '}).fill('day la mat khau')
    // await page.getByRole('textbox', {name:'Ghi chú: '}).fill('day la ghi chu')

    //    await page.getByRole('cell', {name:'Nguyễn Văn A'}).hover()
    // const checkbox = page.getByRole('checkbox', {name:'Tôi đồng ý', checked:true})
    // console.log(await checkbox.count())
    // await expect(checkbox).toBeVisible()

    // await page.getByRole('button', {name: 'Bài tập'}).click()
    // const buttonB = page.getByRole('button', {name: 'More options', expanded: false})
    // await buttonB.click()
    // const menuDuplicated = page.getByRole('menuitem', {name: 'Duplicate'})
    // await expect(menuDuplicated).toBeVisible()

    // await page.locator('#username-input').fill('Hoang')
    // await page.locator('#password-input').fill('123')
    // await page.locator('#login-submit-btn').click()

    //await page.locator('.edit-profile-btn').dblclick()

//--------------------------------------- BAI 3-PART2 ----------------------------------------------------------
    //Tìm theo CSS-HTML ( tìm theo thuộc tính )
    //Start with ^ , endwith $
    //await page.locator('[placeholder="Nhập email"]').fill('hoang@gmail.com')

    //Kết hợp nhiều thuộc tính cùng lúc
    // await page.locator('[data-action="submit"][data-variant="secondary"]')
    // await page.locator('button[data-action="submit"][data-variant="secondary"]')
    // await page.locator('input[type="text"][name="username"][required]')


    const soLuongPhanTu = await page.locator('button[id*="profile"]').count()
    console.log(soLuongPhanTu);
    

    await page.pause()

})