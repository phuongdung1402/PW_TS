import {test, expect} from '@playwright/test';


//test.use({storageState: {cookies: [], origins: []}})

test.use({
    video: {
        mode:'on-first-retry',
        size: {width: 1280, height: 720},
    },
    headless: false,
    // launchOptions: {
    //   slowMo: 8000,
    //   devtools: true,
    // },

    //viewport: {width: 1920, height:1080}
    screenshot: {
      mode: 'on',
      fullPage: true
    },
    baseURL:'https://www.saucedemo.com',
    
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



// test.describe('Mô phỏng Worker Crash', () => {
//   // 1️⃣ SETUP (Chạy OK)
//   test.beforeAll(async () => {
//     console.log('🟢 [BEFORE ALL] 1. Đang tạo dữ liệu RÁC trong Database...');
//     console.log('🟢 [BEFORE ALL] 2. Dữ liệu đã được tạo xong!');
//   });

//   // 2️⃣ TEST (Chỗ này sẽ gây sập)
//   test('Test case này sẽ giết chết Worker', async ({ page }) => {
//     console.log('🔵 [TEST] Đang chạy test...');
    
//     // Giả vờ làm gì đó...
//     await page.waitForTimeout(1000);

//     console.log('💀 [CRASH] Giả lập lỗi Fatal Error! Worker sắp sập...');
    
//     // 💥 LỆNH NÀY SẼ GIẾT CHẾT TIẾN TRÌNH NGAY LẬP TỨC
//     // Giống như rút phích cắm điện, không có lời trăng trối
//     process.exit(1); 
//   });

//   // 3️⃣ TEARDOWN (Hy vọng chạy dòng này để dọn rác)
//   test.afterAll(async () => {
//     // ❌ DÒNG NÀY SẼ KHÔNG BAO GIỜ HIỆN RA
//     console.log('🔴 [AFTER ALL] 🧹 Đang dọn rác... (Nếu bạn thấy dòng này thì Worker chưa chết)');
//   });

// });



// test('Demo Video chỉ quay khi Retry', async ({ page }, testInfo) => {
  
//   console.log(`🔄 Đang chạy lần thứ: ${testInfo.retry + 1} (Retry Index: ${testInfo.retry})`);

//   // 1. Vào trang Login
//   await page.goto('/admin/authentication');
//   await page.fill('input[name="email"]', 'admin@example.com');
//   await page.fill('input[name="password"]', '123456');

//   // ============== KỊCH BẢN GIẢ LẬP =================
//   // Nếu là lần chạy đầu tiên (retry = 0)
//   if (testInfo.retry === 0) {
//       console.log('💥 Lần 1: Cố tình đánh Fail để kích hoạt Retry...');
      
//       // Giả vờ expect sai để gây lỗi
//       // Playwright thấy lỗi -> Sẽ hủy lần này (KHÔNG LƯU VIDEO) -> Tự động Retry
//       expect(true).toBe(false); 
//   }
  
//   // ============== LẦN CHẠY THỨ 2 ===================
//   // Nếu code chạy xuống được đây, nghĩa là đang ở lần Retry (retry = 1)
//   console.log('✅ Lần 2: Đã Retry! Lúc này Video đang được quay...');
  
//   await page.click('button[type="submit"]');
//   await expect(page).toHaveTitle(/Dashboard/);
// });