import { test, expect } from '@playwright/test'

test('GET - Lấy thông tin bài viết số 1', async ({ request }) => {
    //1 Gửi yêu cầu tới endpoint
    const response = await request.get('/posts/1');

    const status = response.status();
    const statusText = response.statusText();
    expect(status).toBe(200)
    expect(statusText).toContain('OK')
    console.log(status);
    console.log(statusText);

    const body = await response.json()
    console.log('GET RESPONSE ', body);
    expect(body.id).toBe(1);
    expect(body.userId).toBe(1)

})

test('POST - Tạo bài viết mới', async ({ request }) => {
    const response = await request.post('/posts', {
        data: {
            title: 'Hoc PW với Hoàng',
            body: 'Bài 1: API',
            userId: 1,
        },
    });
    const body = await response.json();
    console.log('POST request ', body);
    expect(body.title).toBe('Hoc PW với Hoàng')
    
})