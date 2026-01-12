import {test, expect} from '@playwright/test'

test('Test su dung browsercontext', async({browser})=> {
    console.log('Khoi tao phong 201');
    const adminContext = await browser.newContext({
        viewport : {width: 1000, height: 900},
        recordVideo : {dir: 'videos/admin'}
    });

    //
    const adminPage = await adminContext.newPage();

    await test.step('Phong 201 - Private 201', async()=> {
        console.log('Admin dang nhap phong');
        await adminPage.goto('https://crm.anhtester.com/admin/authentication')
        await adminPage.locator('#email').fill('admin@example.com');
        await adminPage.locator('#password').fill('123456')
        await adminPage.getByRole('button', {name: 'Login'}).click()
        await adminPage.waitForURL(/.*admin\//);
        console.log('ADMIN da vao phong 201');
        
    })
    const secretDashboard = adminPage.url()

////////////////////////////////////////////////////////////////////////////////////////////
    const hackerContext = await browser.newContext({
        viewport : {width: 375, height: 660},
        recordVideo : {dir: 'videos/dot nhap'}
    })

    const hackerPage = await hackerContext.newPage();

    await test.step('Hacker truy cap vao link mat', async()=> {
        await hackerPage.goto(secretDashboard)
    })

   
    //expect(adminPage.url).toContain('admin')

    await adminPage.pause()
    await hackerPage.pause()

   // await expect(hackerPage).toHaveURL('')

    await adminContext.close()
    await hackerContext.close()
})


//khi admin dang nhap vao web -> server se tra ve 1 cai session_id =... admin cat vao tui cua adminContext()
//Hacker dc tao ra tu hackerContext => tao moi bang newContext() -> se co cai tui trong rong

//Checkin -> khi hacker vao link dashboard -> server hoi : session_id
//Hacker tra loi : ko co session id -> ban ve login ngay

