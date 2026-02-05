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