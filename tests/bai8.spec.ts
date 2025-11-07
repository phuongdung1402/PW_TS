import { test, expect , Page } from '@playwright/test';
import { stat } from 'node:fs/promises';

test('Ví dụ về upload file', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '📤 Upload Files' }).click()

    // 1) Input hiển thị
    // const visible = page.locator('#visible-input')
    // await visible.setInputFiles('tests/fixtures/sample1.txt')
    // await expect(page.locator("//div[text()='1) Input hiển thị (setInputFiles)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span")
    //     .nth(1)).toContainText('sample1.txt')



    // 2) Input bị ẩn - set trực tiếp
    // const hidden = page.locator('#hidden-input-upload');
    // await hidden.setInputFiles('tests/fixtures/sample1.txt');
    // await expect(page.locator('#hidden-input-upload')).toBeAttached();

    // const hidden = page.locator('#hidden-input-upload')
    // await hidden.setInputFiles('tests/fixtures/sample1.txt')
    // await expect(hidden).toBeAttached()
    // await expect(page.locator("//div[text()='2) Input bị ẩn (setInputFiles trực tiếp)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Đã chọn: ']/span")).toHaveText('sample1.txt')


    //3) Bắt sự kiện filechoose khi bắt buộc phải click nút
    //C1 : Thẻ input bị ẩn - set trực tiếp
    // const chooseInput = page.locator('#file-chooser-input')
    // await chooseInput.setInputFiles('tests/fixtures/sample1.txt')
    // await expect(chooseInput).toBeAttached()


    //C2 : Bắt sự kiện filechoose khi bắt buộc phải click nút
    // const chooserPromise = page.waitForEvent("filechooser")
    // await page.locator('#fancy-button').click()
    // const chooser = await chooserPromise
    // await chooser.setFiles('tests/fixtures/sample1.txt')
    // await expect(page.locator("//div[text()='3) Bắt sự kiện filechooser (waitForEvent)']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Đã chọn: ']/span")).toHaveText('sample1.txt')


    //4) Upload nhiều file + Xóa
    // const multi = page.locator('#multi-input')
    // await multi.setInputFiles([
    //     'tests/fixtures/sample1.txt',
    //     'tests/fixtures/sample2.txt',
    //     'tests/fixtures/sample3.txt'
    // ])
    // await expect(page.locator("//div[text()='4) Upload nhiều file + Xoá']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Số file: ']/span")).toHaveText('3')

    // // Xóa
    // await multi.setInputFiles([])
    // await expect(page.locator("//div[text()='4) Upload nhiều file + Xoá']//ancestor::div[@class='ant-card-head']//following-sibling::div//span[text()='Chưa có file nào']")).toBeVisible();

    // await page.pause()
});


test('Ví dụ về download file', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click()
    await page.getByRole('tab', { name: '📤 Upload Files' }).click()

    //1. Đợi event download
    // Đợi cho tất cả các promise con ở trong array thực hiện thành công rồi lấy kết quả
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#download-demo-btn').click()
    ]);
    const fileName = download.suggestedFilename()
    console.log(fileName)

    //2. Kiểm tra tên file suggested
    //expect(download.suggestedFilename()).toBe('login-data.xlsx')
    await download.saveAs('downloads/login-data-verified.xlsx')
    const info = await stat('downloads/login-data-verified.xlsx');
    expect(info.size).toBeGreaterThan(100);

    await page.pause()
});



test('Ví dụ về shadow DOM', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', {name:'🧩 Shadow DOM & iFrame'}).click()

    // tương tác như 1 element bình thường, chỉ cần trỏ tới thằng DOM -> Và từ đó dùng locator chain để tuonwg tác
    // phần còn lại PW xử lý
    const openHost = page.locator('open-shadow-el#open-shadow-demo');
    await openHost.locator('#os-input').fill('Hello Shadow');
    await openHost.locator('#os-btn').click();
    await expect(openHost.locator('#os-status')).toHaveText('You typed: Hello Shadow');

    await page.pause()
})



test('Ví dụ về iFrame', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', {name:'🧩 Shadow DOM & iFrame'}).click()

    // const frame = page.frameLocator('#demo-iframe')
    // await frame.locator('#if-input').fill('Hello iFrame')
    // await frame.locator('#if-btn').click()
    // await expect(frame.locator('#if-status')).toHaveText('You typed: Hello iFrame')


    // CÁCH 2 : Theo title attribute 
    const iframeSelector = 'iframe[title="payment-iframe"]'
    const iframeElement = page.locator(iframeSelector)
    await iframeElement.waitFor({state: 'attached', timeout: 10000})

    const framePayment = page.frameLocator(iframeSelector)
    await framePayment.locator('#pf-input').fill('hello')
    await page.pause()
})




test('Ví dụ về evaluate', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', {name:'🔧 evaluate()'}).click()

    const domInfo = await page.locator('#demo-input-1').evaluate((el : HTMLInputElement)=> {
        return {
            value: el.value,
            placeholder: el.placeholder,
            type: el.type,
            disable: el.disabled,
            maxLength : el.maxLength,
            className : el.className,
            defaultValue : el.defaultValue,
            selectionStart: el.selectionStart, // ko có native method
            selectionEnd: el.selectionEnd, // ko có native method
        }
    })
    console.log('DOM Infor : ', domInfo)

    await page.pause()
})

async function isImageOK (page: Page, imgLocator : string): Promise<boolean> {
    // await page.locator(imgLocator).waitFor({state: 'visible'})
    // await page.waitForTimeout(2000)
    const result = await page.locator(imgLocator).evaluate((img: HTMLImageElement) => {
        console.log('width', img.naturalWidth)
        console.log('height', img.naturalHeight)
        return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0
    });
    return result;
}


test('Ví dụ về brokenImage', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 5: Shadow DOM & iFrame' }).click()
    await page.getByRole('tab', {name:'🖼️ Broken Images'}).click()


    // const checkImage = await isImageOK(page, "//img[@alt='Vite Logo']")
    // expect(checkImage).toBeTruthy()

    const checkImageF = await isImageOK(page, "//img[@alt='Broken 404']")
    expect(checkImageF).toBeFalsy()
    await page.pause()
})
