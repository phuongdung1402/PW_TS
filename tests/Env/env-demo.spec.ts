import {test} from '@playwright/test'

test('Check env', async ({page})=> {
    const projectName = process.env.PROJECT_NAME;
    const url = process.env.BASE_URL;
    const password = process.env.ADMIN_PASSWORD;

    console.log(`PROJECT DANG TEST ${projectName}`);
    console.log(`URL DANG TEST ${url}`);
    console.log(`MAT KHAU DANG DUNG ${password}`);


    if(url) await page.goto(url)
    
})