import {test, expect} from '@playwright/test'

// ví dụ về dữ liệu sinh test ( ko đồng bộ ) - ko phải static
// const luckeyNumber = Math.floor(Math.random()*100);

// test(`Test vé số ${luckeyNumber}`, async()=> {
//     console.log('Tôi trúng số rồi');
// })

// CHUẨN BỊ DỮ LIỆU CỨNG (STATIC DATA)
//Đây chính là danh sách khách mời cố định
//Main process và worker process đều nhìn thấy mảng này y hệt nhau 

const TEST_CASES = [
    {
        id: 'TC01',
        description : 'Đăng nhập thành công (Standard User)',
        username: 'standard_user',
        password: 'secret_sauce',
        shouldPass: true, 
    },
    {
        id: 'TC2',
        description: 'User bị khóa (Locked Out)',
        username: 'locked_out_user',
        password: 'secret_sauce',
        shouldPass: false,
        expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
    {
        id: 'TC03',
        description: 'Sai mật khẩu',
        username: 'standard_user',
        password: 'wrong_password',
        shouldPass: false,
        expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        id: 'TC04',
        description: 'Bỏ trống Username',
        username:'',
        password: 'secret_sauce',
        shouldPass: false,
        expectedError: 'Epic sadface: Username is required',
    },
]

// SINH TEST TỰ ĐỘNG (PARAMETERIZED)

test.describe('SauceDemo Login Data-Driven', ()=> {
    //Vòng lặp chạy ngay khi Main process quét file 
    for (const data of TEST_CASES) {
        //Tạo tên test DUY NHẤT bằng cách ghép ID + Description

        test(`${data.id} ${data.description}`, async ({page})=> {
            //B1 : Truy cập trang
            await page.goto('https://www.saucedemo.com')

            //B2: Điền dữ liệu ( nếu có )
            //nếu data.username rộng thì thôi ko điền (để testcase bỏ trống)

            if(data.username) {
                await page.locator('[data-test="username"]').fill(data.username);
            }

            if(data.password) {
                await page.locator('[data-test="password"]').fill(data.password);
            }

            //B3 : CLICK LOGIN 
            await page.locator('[data-test="login-button"]').click();

            //B4 : Kiểm tra kết quả (assertion)
            if(data.shouldPass) {
                //kịch bản mong đợi thành công
                //check url đổi sang trang inventory

                await expect(page).toHaveURL(/.*inventory.html/);

                //check tiêu đề "Products" hiện ra
                await expect(page.locator('.title')).toHaveText('Products');

            } else {
                //Kịch bản mong đợi lỗi (negative)
                //tìm cái thông báo lỗi màu đỏ

                const errorMsg = page.locator('[data-test="error"]');
                await expect(errorMsg).toBeVisible();
                await expect(errorMsg).toHaveText(data.expectedError!) // dấu ! là báo TS biến này chắc chắn có
            }
        });
    }
});