// import { FullConfig} from 'playwright/test'

// async function globalSetup (config : FullConfig) {
//     console.log(`[GLOBAL SETUP] bắt đầu khởi động hệ thống`);
//     await new Promise((r)=> setTimeout(r, 1000));
//     process.env.DB_CONNECTION_URL = 'postgress://admin:123';
//     process.env.API_PORT = '8080';
// }

// export default globalSetup;


import {chromium, FullConfig} from '@playwright/test'

async function globalSetup(config: FullConfig){
    const browser = await chromium.launch({headless: false});
    const newContext = await browser.newContext();
    const page  = await newContext.newPage();

    try {
        await page.goto('https://github.com/login');
        await page.click('input[name="commit-sign-in"]', {timeout: 5000});

        await page.context().storageState({path: 'auth.json'})

    }catch(error){
        console.log('Login that bai!');

        throw error;
    } finally {
        await browser.close();
    }

}

export default globalSetup;