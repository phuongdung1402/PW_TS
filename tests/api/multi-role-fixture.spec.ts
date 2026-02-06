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

    await Promise.all([adminPage.goto('/chat'),staffPage.goto('./chat')])

    await Promise.all([
        adminPage.waitForLoadState('domcontentloaded'), 
        staffPage.waitForLoadState('domcontentloaded')
    ]);

    //Admin click vao staff id2 de mo chat'
    




    await adminPage.goto('/admin/users');
    await adminPage.waitForLoadState('domcontentloaded');

    await staffPage.goto('/admin/users');
    await staffPage.waitForLoadState('domcontentloaded');

    await adminPage.pause();
    await staffPage.pause();

    await adminPage.close();
    await staffPage.close();
})