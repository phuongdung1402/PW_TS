//hooks (life cycle)

//Tứ trụ hooks (life cycle)

//beforeAll (worker) --> 1 lần duy nhất / file
//beforeEach (test) chạy lặp lại mỗi lần trc mỗi test
//afterEach (test) chạy lặp lại mỗi lần sau mỗi test
//afterAll (worker) -> 1 lần duy nhất sau khi chạy hết test


import {test,expect, Page, chromium} from '@playwright/test'

// //Khai bao bien toan cuc
// let page: Page;

// test.beforeAll(async()=> {
//     console.log(`[BEFORE] Khởi động DB....`);
// })

// test.beforeEach(async ({browser})=> {
//     console.log(`[Before each] Mở trang mới`);
//     const context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto(process.env.BASE_URL!);
// });

// test('TC1. Login', async()=> {
//     console.log(`[TC01] Dang chay`);
//     await expect(page).toHaveTitle('Perfex CRM | Anh Tester Demo - Login')    
// });

// test('TC2. Check footer', async()=> {
//     console.log(`[TC02] Dang chay`);
//     await expect(page.locator('h1')).toBeVisible()
// });

// test.afterEach(async()=> {
//     console.log(`[After Each] Don dep`);
//     await page.close()
// });

// test.afterAll(async ()=> {
//     console.log(`[After All] Ngat ket noi database`);
// });


// test.describe.configure({mode : 'serial'});

// let sharedPage: Page;

// test.beforeAll(async () => {
//     const browser = await chromium.launch();

//     //tao context
//     const context = await browser.newContext();
//     sharedPage = await context.newPage();
// })

// test.beforeEach(async ()=> {
//     // Thay vi tao moi ta dung lai bien shared page
//     await sharedPage.goto('https://example.com')
// })

// test('Test1 : User bat che do darkmode', async ()=> {
//     await sharedPage.evaluate(()=> {
//         localStorage.setItem('them', 'dark');
//     });

//     const theme = await sharedPage.evaluate(()=> localStorage.getItem('theme'))

//     expect(theme).toBe('dark');
// });

// test('Test2: User moi vao mong doi che do sang', async ()=> {
//     const theme = await sharedPage.evaluate(()=> localStorage.getItem('theme'));
//     expect(theme).toBeNull()
// })

///

//worker reuse
// 4 worker - 100 chạy test

//1. worker1 chạy before All (mở page)
//2. worker 1 chạy test A (login -> chuyển sang dashboard)
//3. workker 1 chưa tắt , nó nhận tiếp test B
//4 lúc này before all ko chạy lại ( vì nó là beforeall -> 
// chạy 1 lần cho cả file worker đó) , test B nhận lại cái sharepage cũ từ A ( đang ở dashboard) -> Fail




test.describe.configure({mode : 'serial'});

let sharedPage: Page;

test.beforeAll(async () => {
    const browser = await chromium.launch();

    //tao context
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto(process.env.BASE_URL!)
})


test('Test1 :Login', async ()=> {
    console.log(`TC01 Dang chay`);
    await expect(sharedPage).toHaveTitle('Perfex CRM | Anh Tester Demo - Login')
    
});

test('Test2: User moi vao mong doi che do sang', async ()=> {
    console.log(`TC02 Dang chay`);
    await expect(sharedPage.locator('h1')).toBeVisible()
})


//FIXTURE - giống beforeEach -> nó tự động tạo page mới cho mỗi bài test (sạch sẽ)
// ko cần biến let hay biến global , Page đc truyền thẳng vào hàm test({page})
//tự động dọn dẹp (Khi chạy xong fixture tự đóng page) , tự giải phóng RAM
//tái sử dụng : viết 1 lần dùng cho 1000 test