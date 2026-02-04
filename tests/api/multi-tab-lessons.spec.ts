import { loadFromFolder } from './file-upload.util';
import { test, expect } from './fixtures/gatekeeper.api.fixture';
import { ProductService } from './services/ProductService';
import { TabManager } from './tab-manager';

test.describe('Bài học - Multitab với tabmanager', () => {

    test('TC01: Tạo product bằng API + verify trên UI', async ({ page , context}) => {

        test.setTimeout(120000);
        //Đầu tiên khởi tạo manager và đăng kí tab đầu tiên
        const tabs = new TabManager();
        tabs.add('main', page)

        // B1: Đăng nhập bằng UI
        await page.goto('https://coffee.autoneko.com/login');
        await page.getByPlaceholder('Nhập email hoặc tên đăng nhập').fill('admin');
        await page.getByPlaceholder('Nhập mật khẩu').fill('Admin@123');
        await page.getByRole('button', { name: 'Đăng nhập' }).click();
        await expect(page.getByRole('button', { name: 'Tiếp tục' })).toBeVisible();
        await page.getByRole('button', { name: 'Tiếp tục' }).click()

        //B2: Vào detail
        await page.goto('https://coffee.autoneko.com/admin/orders');

        await page.locator('a[href*="/admin/orders/"]').first().click();
        const h1Title = await page.locator('h1').textContent();
        expect(h1Title).toBeTruthy();
        tabs.status();

        //auto waiting sử dụng expect vs h1 chứa productId
        //await page.waitForLoadState('networkidle');

        const invoiceBtn = page.getByText('In hóa đơn');

        const [invoicePage] = await Promise.all([context.waitForEvent('page'), invoiceBtn.click()]);
        
        tabs.add('invoice', invoicePage);
        await invoicePage.waitForLoadState('domcontentloaded');

        await tabs.switchTo('main');
        console.log(`Đang ở ${tabs.currentName} (${tabs.current?.url})`);
        
        await tabs.switchTo('invoice');
        console.log(`Đang ở ${tabs.currentName} (${tabs.current?.url})`);

        const invPage = tabs.get('invoice')
        if(invPage) {
            const hasH1 = await invPage.locator('h1').textContent();
            console.log(hasH1);
        }

        //await tabs.close('invoice');
        //await tabs.switchTo('main');
        //tabs.status();
        
        await page.pause();
    });


    test('TC02.Quản lý popup bằng tabmanager', async ({page, context})=> {
        test.setTimeout(120000);

        const tabs = new TabManager();
        tabs.add('main', page);

        //B1 : Đăng nhập
        await page.goto('https://coffee.autoneko.com/login');
        await page.getByPlaceholder('Nhập email hoặc tên đăng nhập').fill('admin');
        await page.getByPlaceholder('Nhập mật khẩu').fill('Admin@123');
        await page.getByRole('button', {name: 'Đăng nhập'}).click();
        await expect(page.getByRole('button', {name: 'Tiếp tục'})).toBeVisible();
        await page.getByRole('button', {name : 'Tiếp tục'}).click();

        //B2 : Vào detail
        await page.goto('https://coffee.autoneko.com/admin/orders');
        
        await page.locator('a[href*="/admin.orders/"]').first().click();
        const h1Title = await page.locator('h1').textContent();
        expect(h1Title).toBeTruthy();
        tabs.status();

        const invoiceBtn = page.getByText('In hóa đơn');
        const [invoicePage] = await Promise.all([context.waitForEvent('page'), invoiceBtn.click()])

        tabs.add('invoice', invoicePage);
        await invoicePage.waitForLoadState('domcontentloaded')

        await tabs.switchTo('invoice');
        const invPage = tabs.get('invoice');


        const openWindowBtn = invPage?.getByText('Cửa sổ mới');
        const [popup] = await Promise.all([
            invPage?.waitForEvent('popup'), openWindowBtn?.click()
        ]);

        tabs.add('invoice_popup', popup!);
        tabs.status();

        await tabs.switchTo('invoice_popup');
        console.log(`Hiện tại ${tabs.currentName}`);
        await page.pause();
    })
    

    // test('TC03 - Testing multi tab', async ({page})=> {
    //     await page.goto('https://coffee.autoneko.com/');
    //     await page.getByRole('link', {name: 'login Đăng nhập'}).click();
    //     await page.getByPlaceholder('Nhập email hoặc tên đăng nhập').fill('admin');
    //     await page.getByPlaceholder('Nhập mật khẩu').fill('Admin@123');
    //     await page.getByRole('button', {name: 'Đăng nhập'}).click();
    //     await expect(page.getByRole('button', {name: 'Tiếp tục'})).toBeVisible();
    //     await page.getByRole('button', {name: 'Tiếp tục'}).click();
    //     await page.locator("//a[text()='Quản lý']").click();
    //     await page.locator("//a/span[text()='Quản lý đơn hàng']").click();
    //     await page.locator('//a[@href="/admin/orders/100"]').first().click();
    //     await page.locator('//a[text()="In hóa đơn"]').click();
    // })
})