import {test, expect} from './fixtures/role.fixture';

test('TC01.Admin can see the customers, Staff cannot', async ({asRole})=> {
    const adminPage = await asRole('admin');
    const staffPage = await asRole('staff')

    await adminPage.goto('/admin/users');
    await adminPage.waitForLoadState('domcontentloaded');

    await staffPage.goto('/admin/users');
    await staffPage.waitForLoadState('domcontentloaded');

    await adminPage.pause();
    await staffPage.pause();

    await adminPage.close();
    await staffPage.close();
})



test('TC02.Admin va manager chat realtime voi nhau', async ({asRole})=> {
    const adminPage = await asRole('admin');
    const staffPage = await asRole('staff')

    // Promise all đợi cho các hành động bên trong xử lí 
    await Promise.all([adminPage.goto('/chat'),staffPage.goto('./chat')])

    await Promise.all([
        adminPage.waitForLoadState('domcontentloaded'), 
        staffPage.waitForLoadState('domcontentloaded')
    ]);

    //Admin click vao staff (id:2) de mo chat'
    await adminPage.locator('[data-testid="chat-user-2"]').click();
    await expect(adminPage.locator('[data-testid="chat-input-message"]')).toBeVisible();

    //Staff click vào admin (id:1) de mo chat
    await staffPage.locator('[data-testid="chat-user-1"]').click();
    await expect(staffPage.locator('[data-testid="chat-input-message"]')).toBeVisible();

    //Admin gửi tin nhắn
    const adminMesage = `Hello - send từ admin ! ${Date.now()}`;
    await adminPage.locator('[data-testid="chat-input-message"]').fill(adminMesage);
    await adminPage.locator('[data-testid="chat-button-send"]').click();
    await expect(staffPage.locator('[data-testid="chat-messages"]')).toContainText(adminMesage);
    console.log('Staff đã nhận đc tin nhắn từ admin');
    

    //Staff gửi tin nhắn
    const staffReply = `Tôi nhận đc rồi !  ${Date.now()}`;
    await staffPage.locator('[data-testid="chat-input-message"]').fill(staffReply);
    await staffPage.locator('[data-testid="chat-button-send"]').click();

    //Verify admin nhận đc tin nhắn 
    await expect(adminPage.locator('[data-testid="chat-messages"]')).toContainText(staffReply);
    await adminPage.pause()
    await staffPage.pause()
    
})