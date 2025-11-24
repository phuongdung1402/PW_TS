import { test, expect } from '@playwright/test'
import { executionAsyncId } from 'async_hooks'

//B1: Break nhỏ UI để xem có chức năng gì 
//=> UI trang đăng nhập có chức năng login vào dashboard HRM
//B2 : Xác định test case sẽ có những TC gì
//B3 : Xác định các step sẽ thực hiện và các step đó liên quan đến các elements nào ở trên UI và nguồn input (dât test ) đầu vào
//B4 : Xác định locator của các elements 
//Tiến hành viết testcase 

const URL = 'https://hrm.anhtester.com/erp/login'
// List ra những locator sẽ dùng
test.describe('HRM Login Page', () => {
    //Positive case
    test('TC_LOGIN_01 - Đăng nhập thành công (Click)', async ({ page }) => {
        ////input[@id='iusername'] 
        ////input[@id='ipassword']
        ////button[@type='submit']

        await page.goto('https://hrm.anhtester.com/')
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await page.locator("#iusername").fill('admin_example')
        await page.locator("#ipassword").fill('123456')
        await page.locator("//button[@type='submit']").click()
        //await page.keyboard.press('Enter')

        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.')
        await expect(page).toHaveURL(/erp\/desk/)
    })

    test('TC_LOGIN_02 - Đăng nhập thành công (Enter)', async ({ page }) => {
        ////input[@id='iusername'] 
        ////input[@id='ipassword']
        ////button[@type='submit']

        await page.goto('https://hrm.anhtester.com/')
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await page.locator("#iusername").fill('admin_example')
        await page.locator("#ipassword").fill('123456')
        // await page.locator("//button[@type='submit']").click()
        await page.keyboard.press('Enter')
        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.')
        await expect(page).toHaveURL(/erp\/desk/)
    })
})


test.describe('HRM Login Page - Negative case', () => {
    test('TC_LOGIN_03 - SAI MẬT KHẨU', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/')
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await page.locator("#iusername").fill('admin_example')
        await page.locator("#ipassword").fill('12345689')
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toContainText('Invalid Login Credentials.')
    })

    test('TC_LOGIN_04 - SAI USERNAME', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator('h4')).toContainText('Welcome to HRM | Anh Tester Demo')
        await page.locator('#iusername').fill('user_khong_ton_tai')
        await page.locator('#ipassword').fill('123456')
        await page.keyboard.press('Enter')

        await expect(page.locator('.toast-message')).toContainText('Invalid Login Credentials.')
    })

    test('TC_LOGIN_05 - All fields are empty', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator('h4')).toContainText('Welcome to HRM | Anh Tester Demo')
        await expect(page.locator('#iusername')).toBeVisible()
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toContainText('The username field is required.')
    })

    test('TC_LOGIN_06 - Password is empty', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator('h4')).toContainText('Welcome to HRM | Anh Tester Demo')
        await page.locator('#iusername').fill('admin_example')
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toContainText('The password field is required.')
    })

    test('TC_LOGIN_07 - Username is empty', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator('h4')).toContainText('Welcome to HRM | Anh Tester Demo')
        await page.locator('#ipassword').fill('123456')
        await page.keyboard.press('Enter')
        await expect(page.locator('.toast-message')).toContainText('The username field is required.')
    })


    //Your password is too short, minimum 6 characters required
    test('TC_LOGIN_08 - MẬT KHẨU NGẮN', async ({ page }) => {
        //Arrange
        await page.goto('https://hrm.anhtester.com/')
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        //Actions
        await page.locator("#iusername").fill('admin_example')
        await page.locator("#ipassword").fill('12345')
        await page.keyboard.press('Enter')

        //Assert
        await expect(page.locator('.toast-message')).toContainText('Your password is too short, minimum 6 characters required.')
    })
})

test.describe('HRM Login Page - UI', () => {
    test('TC_LOGIN_09 - Mật khẩu bị che (Masking)', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/erp/login')
        await expect(page.locator('#ipassword')).toHaveAttribute('type', 'password')

    })

    test('TC10 - QUÊN MẬT KHẨU', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/')
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')
        await page.locator("//span[normalize-space(.) = 'Forgot password?']//parent::a").click()
        await page.waitForURL('**/forgot-password')        
    })


    test('TC_LOGIN_11 -Placeholder (Văn bản gợi ý)', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator('#iusername')).toHaveAttribute('placeholder', 'Your Username')
        await expect(page.locator('#ipassword')).toHaveAttribute('placeholder', 'Enter Password')

    })

    test('TC_LOGIN_12 - Phân biệt Hoa / Thường', async ({page})=> {
        await page.goto(URL)
        await page.locator("#iusername").fill('ADMIN_EXAMPLE')
        await page.locator('#ipassword').fill('123456')
        await page.keyboard.press("Enter")
        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.')
        await page.pause()
    })
})