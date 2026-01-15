import {test, expect} from '@playwright/test';


//test.use({storageState: {cookies: [], origins: []}})

test.use({
    video: {
        mode:'retain-on-failure',
        size: {width: 1280, height: 720},
    }
})


test('Mua hàng (Đã login sẵn)', async ({page})=> {
    console.log('[TEST] Bắt đầu test mua hàng .....');

    //Vào thẳng trang chủ (Sẽ tự nhận cookies từ user.json)
    await page.goto('https://www.saucedemo.com/inventory.html');
    //await page.pause()

    //Assert : Chắc chắn là đã login rồi (Có nút Add to cart)
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible({timeout: 1000});

    console.log('[TEST] Test mua hàng thành công ')
})