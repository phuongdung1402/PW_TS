import {test, expect} from '@playwright/test'

//Viết 1 file test trả về thông tin đăng nhập thành công mà ko cần gọi xuống BE
//Ví dụ mình sẽ dùng user test3

//pattern intercept thì sẽ thường dùng ** để match bất kì phần nào của URL
const API_REGISTER = '**/auth/register'

test('TC_01 : Mock success - Đăng ký thành công', async ({page})=> {
    //intercept : bao giờ cũng đặt đầu tiên trong file test
    //khai báo trc khi thực hiện hành động của FE
    await page.route(API_REGISTER, async (route)=>{
        await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
                messeage: 'Đăng kí thành công',
                user : {
                    id: 999,
                    email: 'test@example.com',
                    username: 'test3',
                }
            })
        })
    })

    await page.goto('https://coffee.autoneko.com/register');
    await page.getByRole('textbox', {name: 'Tên đăng nhập'}).fill('test3');
    await page.getByRole('textbox', {name: 'Địa chỉ Email'}).fill('test@example.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
    await page.getByRole('textbox', {name: 'Xác nhận mật khẩu'}).fill('12345678');
    await page.locator("input[type='checkbox']").click();
    await page.getByRole('button', {name: 'Đăng ký ngay'}).click();

    await expect(page.getByRole('heading', {name:'Thành công'})).toBeVisible();

    await page.pause()
})

test('TC_02 : Mock Error 500 - Server Error', async ({page})=> {
    await page.route(API_REGISTER, async (route) =>{
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Server đang lỗi'
            })
        })
    })

    await page.goto('https://coffee.autoneko.com/register');
    await page.getByRole('textbox', {name: 'Tên đăng nhập'}).fill('test3');
    await page.getByRole('textbox', {name: 'Địa chỉ Email'}).fill('test@example.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
    await page.getByRole('textbox', {name: 'Xác nhận mật khẩu'}).fill('12345678');
    await page.locator("input[type='checkbox']").click();
    await page.getByRole('button', {name: 'Đăng ký ngay'}).click();

    await page.pause();
})

test('TC_03 : Mock Error 400 - Validation Error', async ({page})=> {
    await page.route(API_REGISTER, async (route) =>{
        await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Dữ liệu ko hợp lệ'
            })
        })
    })

    await page.goto('https://coffee.autoneko.com/register');
    await page.getByRole('textbox', {name: 'Tên đăng nhập'}).fill('test3');
    await page.getByRole('textbox', {name: 'Địa chỉ Email'}).fill('test@example.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
    await page.getByRole('textbox', {name: 'Xác nhận mật khẩu'}).fill('12345678');
    await page.locator("input[type='checkbox']").click();
    await page.getByRole('button', {name: 'Đăng ký ngay'}).click();

    await page.pause();

})

test('TC_04 : Mock delay - Test Loading state', async ({page})=> {
    await page.route(API_REGISTER, async (route) =>{

        //delay 10s
        await new Promise((resolve) => setTimeout(resolve, 100000));

        await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Đăng ký thành công',
                user: {
                    id: 999,
                    email: 'test@example.com',
                    username: 'test3'
                }
            })
        })
    })

    await page.goto('https://coffee.autoneko.com/register');
    await page.getByRole('textbox', {name: 'Tên đăng nhập'}).fill('test3');
    await page.getByRole('textbox', {name: 'Địa chỉ Email'}).fill('test@example.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('12345678');
    await page.getByRole('textbox', {name: 'Xác nhận mật khẩu'}).fill('12345678');
    await page.locator("input[type='checkbox']").click();
    await page.getByRole('button', {name: 'Đăng ký ngay'}).click();

    await page.pause();

})