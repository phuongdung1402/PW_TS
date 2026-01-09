import {test, chromium} from '@playwright/test'


test('Khởi nguyên , tự tay khởi động trình duyệt', async()=> {
    console.log(`B1: Launch browser - Xay nha`);

    // quyet dinh hinh cua trinh duyet
    const browser = await chromium.launch({
        headless: false,
        slowMo: 2000,
        channel: 'chrome',
    });

    console.log(`B2: New context (Mo phong)`);
    const context = await browser.newContext({
        viewport : {width: 1280, height: 720},
        recordVideo : {dir: 'videos/'},
        geolocation: {latitude: 52.1, longitude: 13.18},
    });

    console.log(`B3 : New page (Open tab)`);
    const page = await context.newPage()

    //Thao tac
    await page.goto('https://crm.anhtester.com')
    await page.locator('#email').fill('admin@example.com')

    //buoc quan trong
    //bat buoc phai nho close neu ko se bi memory leak
    await browser.close()
    
})