import {test} from '@playwright/test'
// test.use({
//     headless:false,
//     viewport: {width:300, height:800},
    
// })

// test('Đăng nhập Login Page', async ({page})=> {
//     // cộng với BASE URL từ config với string ở goto
//     await page.goto('/admin/authentication');

//     await page.locator('#email').fill('admin@example.com')
//     await page.locator('#password').fill('123456')
//     await page.getByRole('button', {name: 'Login'}).click()
//     console.log(`DANG NHAP THANH CONG`);
// })


//TAGS
test('Đăng nhập thành công @smoke', async()=> {
    console.log(`Test dang nhap @smoke`);
});


test('Thêm vào giỏ hàng', { tag : '@regresstion' }  , async ()=> {
    console.log(`Test gio hang (@regression)`);
})

test('Thanh toán thẻ Visa debit', { tag: ['@smoke', '@slow']}, async()=> {
    console.log(`Test thanh toan the (@smoke + @slow)`);
} )

test.describe('Nhóm quản lý các user', {tag: '@authen'}, ()=> 
    test('Đổi mật khẩu', async()=> {
        console.log(`Test doi mat khau (@authen)`);
        
    })
})