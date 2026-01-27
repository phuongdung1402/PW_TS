import { test, expect } from '@playwright/test'

test('TC01. Register -> Login -> Lấy JWT token', async ({ request }) => {
    //STEP 1 Gửi yêu cầu tới endpoint (đăng kí tài khoản)
    const uniqueId = Date.now();

    const newUser = {
        username: `student_${uniqueId}`,
        email: `student_${uniqueId}@test.com`,
        password: '123456789'
    }

    const resgisterRes = await request.post('/auth/register', { data: newUser });

    const regisbody = await resgisterRes.json();

    expect(regisbody.access_token).toBeTruthy();
    expect(regisbody.token_type).toBe('Bearer')

    //STEP 2 Đăng nhập
    const loginRes = await request.post('/auth/login', {
        data:
        {
            username: newUser.username,
            password: newUser.password
        }
    })

    expect(loginRes.status()).toBe(200);
    const loginBody = await loginRes.json();
    console.log(loginBody.access_token);

    //STEP 3 Lấy JWT

})

async function getToken(request: any): Promise<string> {
    const loginRes = await request.post('/auth/login', {
        data: {
            username: 'test1',
            password: '123456789',
        },
    });
    const body = await loginRes.json();
    return body.access_token;
}

test('TC02: Query param - Lọc products theo type', async ({ request }) => {
    //STEP 1 : Đăng kí tài khoản
    const token = await getToken(request);

    const response = await request.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            type: 'equipment',
            limit: 2,
        }
    })

    expect(response.status()).toBe(200);
    const body = await response.json();

    console.log('So san pham', body.data?.length);

    for (const product of body.data) {
        expect(product.type).toBe('equipment');
    }

    console.log('Tat ca san pham deu la type equiment');
})

test('TC03. Path Param - Lấy product theo id', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.get('/api/products/3', {
        headers: { Authorization: `Bearer ${token}` },

    });

    const body = await response.json();
    console.log(body.id);
    console.log(body.name);

})

test('TC04. Kết hợp query param và path param', async ({ request }) => {

    const token = await getToken(request);

    const listRes = await request.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            type: 'equipment',
            limit: 2,
        }
    });
    const listBody = await listRes.json();
    const productId = listBody.data?.[0]?.id;

    const response = await request.get(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const product = await response.json();
    console.log('Ten san pham', product.name);
    console.log('Gia', product.price_per_unit)

})

// Phân trang
test('TC05. Pagination - Kiểm tra limit trả về đúng số lượng', async ({ request }) => {

    const token = await getToken(request);

    const listRes = await request.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            page: 1,
            limit: 5,
        }
    });
    const listBody = await listRes.json();
    const items = listBody.data;

    console.log(`Nhận được  ${items.length}`);
    expect(items.length).toBe(5)

})


test('TC06. Multipart form - Gửi các text fields ', async ({ request }) => {
    //Ko cần xác thực
    //const token = await getToken(request);

    const listRes = await request.post('/public/test/echo-form', {
        multipart: {
            name: 'Teo',
            email: 'teo@gmail.com'
        }
    });
    const listBody = await listRes.json();
    console.log(listBody.form_fields);
    console.log(listBody.content_type);
})


test('TC07. Multipart form - Upload file ', async ({ request }) => {
    //Ko cần xác thực
    //const token = await getToken(request);

    const fileContent1 = Buffer.from('Đây là nội dung file test upload');
    const fileContent2 = Buffer.from('Đây là nội dung file test upload2');

    const listRes = await request.post('/public/test/echo-form', {
        multipart: {
            name: 'Teo',
            email: 'teo@gmail.com',
            avatar: {
                name: 'test-upload.txt',
                mimeType: 'text/plain',
                buffer: fileContent1,
            },
            avatar2: {
                name: 'test-upload2.txt',
                mimeType: 'image/jpeg',
                buffer: fileContent2,
            }
        }
    });
    const listBody = await listRes.json();
    console.log(listBody.files?.[0].filename);
    console.log(listBody.files?.[1].filename);
})

//URL encode
test('TC08. URL encode ', async ({ request }) => {
    
    const response = await request.post('/public/test/echo-urlencoded', {
        form: {
            userName: 'Nguyễn Văn B',
            email: 'phuongdung@gmail.com',
            message: 'abc',
            password: 'P@ass word&123'
        }
    });

    const resBody = await response.json();
    console.log(resBody)
    
})