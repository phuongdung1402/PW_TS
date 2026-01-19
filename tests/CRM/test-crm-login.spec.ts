// import { test } from "@playwright/test"
// import { CRMLoginPage } from "./pom/CRMLoginPage"
// import { expect } from "@playwright/test"
// import { CRMDashboardPage } from "./pom/CRMDashboardPage"


// test('CRM Login Page - Login thanh cong', async ({page})=> {
//     //arrange: khởi tạo điều kiện cần thiết
//     const loginPage = new CRMLoginPage(page)
//     const dashboardPage = new CRMDashboardPage(page)

//     await loginPage.goto()
//     await loginPage.expectOnPage();

//     //Actions : thực hiện actions   
//     await loginPage.login('admin@example.com','123456')

//     //assert
//     //await expect(page).toHaveURL(/admin/)
//     await dashboardPage.expectOnPage();
// })

import {test, expect} from './fixture/gatekeeper.fixture';

import {testDataCatalog} from './test-data';

//Reset storage để đảm bảo mỗi test chạy sạch sẽ
test.use({storageState: {cookies: [], origins: []}});

//GĐ 1 : PARSE AND PLAN (Main và Worker cùng chạy)
//Giai đoạn này chạy siêu nhanh, chỉ xử lí logic trên RA M để chia nhóm test
console.log(`[PARSE] Loading keys from testDataCatalog ... (PID: ${process.pid})`);

const loginCases = testDataCatalog.loginCases;
type LoginCaseKey = keyof typeof loginCases;

//1. Lấy toàn bộ keys
const allKeys = Object.keys(loginCases) as LoginCaseKey[];

//2. Chia nhóm Positive/Nagative ngay lập tức (Static Logic)
//Main process dùng cái này để biết test nào thuộc group nào

const positiveKeys = allKeys.filter((key) => loginCases[key].data.expectedResult === 'success')
const negativeKeys = allKeys.filter((key)=> loginCases[key].data.expectedResult === 'error')

console.log(`  Found ${positiveKeys.length} positive cases.`);
console.log(`  Found ${negativeKeys.length} negative cases.`);


//GĐ 2: TEST GENERATION (Main ghi danh)
//Group 1 : Positive cases (@smoke)
test.describe('Login - Positive case', {tag : '@smoke'}, ()=> {
    for(const key of positiveKeys) {
        //Lấy description để đặt tên cho Test (Chỉ lấy meta data , chưa clone data nặng)
        const  {description, data} = loginCases[key];

        test(`${key}: ${description}`, async ({page})=> {
          
            console.log(`Running Positive Case: ${key}`);

            await page.goto('/admin/authentication');
            await page.locator('#email').fill(data.email);
            await page.locator('#password').fill(data.password);
            await page.getByRole('button', {name: 'Login'}).click();

            //Verify redirect (Ép kiểu nhẹ vì ta biết chắc chắn đây là success case)
            await expect(page).toHaveURL(new RegExp((data as any).expectedUrl))
        })
    }
});

//Group 2: Negative cases (@regression)
test.describe('Login - Negative Cases ', {tag: '@regression'}, ()=> {
    for(const key of negativeKeys) {
        const {description, data} = loginCases[key];

        test(`${key}: ${description}`, async ({loginPage, page})=> {
            //Clone data mới tinh
            console.log(`Running Negative Case : ${key}`);
            
            await loginPage.expectOnPage();

            const emailInput = page.locator('#email');
            const passwordInput = page.locator('#password');

            //Xử lý điền dữ liệu ( có thể trống )
            await emailInput.fill(data.email);
            await passwordInput.fill(data.password);
            await page.getByRole('button', {name: 'Login'}).click();

            //Logic check lỗi
            const validationType = (data as any).validationType;
            const expectedError = (data as any).expectedError;

            if(validationType === 'browser') {
                //Case 1 : browser validation (HTML5 bubble)

                //Check 1 : Input phải ở trạng thái invalid
                const isInvalid = await emailInput.evaluate((el: HTMLInputElement)=> !el.validity.valid);
                expect(isInvalid).toBe(true);

                //Check 2 : Message trình duyệt
                const validationMessage = await emailInput.evaluate(
                    (el: HTMLInputElement) => el.validationMessage
                );

                //Lưu ý: Message trình duyệt phụ thuộc ngôn ngữ OS, nên dùng toContain cho an toàn
                expect(validationMessage).toContain(expectedError);
            } else {
                //Case 2 : Server Validation (Alert box)
                //Locator này tùy dự án , ví dụ check alert chung
                const alertBox = page.locator('.alert-danger, .alert-warning, div[role="alert"]');
                await expect(alertBox).toBeVisible();
                await expect(alertBox).toContainText(expectedError);
            }

            //Verify vẫn đứng yên ở trang Login
            await expect(page).toHaveURL(/authentication/);
        });
    }
});





