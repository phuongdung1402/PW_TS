import {test, expect} from '@playwright/test'

const CONTRACT_URL = 'https://crm.anhtester.com/contract/65/ec79760f1ac5e966a9abee90e07f64de'

test('Demo admin chat  voi guest', async({browser})=> {
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

    await adminPage.goto(CONTRACT_URL);

    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();
    await guestPage.goto(CONTRACT_URL);

    const adminMsg = `Admin says: ${Date.now()}`;
    const guestMsg = `Guest says: ${Date.now()}`;

    await expect(adminPage.locator('#content')).toBeVisible();
    await expect(guestPage.locator('#content')).toBeVisible();

    await test.step('Admin thao tac truoc', async()=> {
        await adminPage.getByText('Thảo luận').click();
        await expect(adminPage.locator('#discussion.tab-pane.active')).toBeVisible();

        await adminPage.locator('#discussion textarea[name="content"]').fill(adminMsg);

        await adminPage.locator('#discussion button[type="submit"]').click();

        await expect(adminPage.locator('.contract_comment .media-body').last()).toContainText(adminMsg)

    })

    await test.step('Guest nhan va tra loi', async()=> {
        await guestPage.reload()
        await guestPage.getByText('Thảo luận').click();
        await expect(guestPage.locator('#discussion.tab-pane.active')).toBeVisible();
        await expect(guestPage.locator('.contract_comment .media-body').last()).toContainText(adminMsg);

    })

    await adminPage.pause();
    await guestPage.pause()

    await adminContext.close();
    await guestContext.close();

})
