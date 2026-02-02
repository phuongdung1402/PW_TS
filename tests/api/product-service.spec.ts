import { test, expect } from './fixtures/gatekeeper.api.fixture';
import { ProductService } from './services/ProductService';

// test.describe('Products Service test', () => {
//     test('TC01. Get products list', async ({ productService }) => {
//         const response = await productService.getProducts({ limit: 5 });
//         console.log('Total', response.pagination.total_items);
//         console.log('Products', response.data.length);
//         console.log('All products', response.data);
//     })
// })

// Y tuong la : minh se tao ra 1 san pham chi danh rieng de PUT va PATCH -> Dùng xong xóa luôn
test.describe('Product Service Test - PUT và PATCH', () => {
    let testProductId: number;

    test.beforeEach(async ({ productService }) => {
        const product = await productService.createProduct({
            name: `Test PUT - PATCH ${Date.now()}`,
            type: 'bean',
            price_per_unit: 20000,
            unit_type: 'kg',
            specifications: {
                region: 'Bani Mattar',
                altitude: '2,000 - 2,400m',
                processing: 'Natural (Dried on rooftops)',
                grade: 'Mattari',
                flavor_profile: {
                    acidity: 7.0,
                    bitterness: 4.0,
                    sweetness: 7.5,
                    floral: 5.0,
                    notes: ['Rượu vang đỏ', 'Sô-cô-la', 'Gia vị', 'Nho khô'],
                },
                grind_options: ['whole', 'filter'],
                weight_options: [100, 250],
            }
        });
        testProductId = product.id;
        console.log('Created test product', testProductId);

    });

    test.afterEach(async ({ productService }) => {
        if (testProductId) {
            await productService.deleteProduct(testProductId);
            console.log('Deleted test product');
        }
    });

    test('TC01: Cập nhật toàn bộ product ( đầy đủ required fields)', async ({ productService }) => {
        const updatedProduct = await productService.updateProduct(testProductId, {
            name: `Test PUT update ${Date.now()}`,
            type: 'bean',
            price_per_unit: 60000,
            unit_type: 'kg',
            specifications: {
                region: 'Bani Mattar',
                altitude: '2,000 - 2,400m',
                processing: 'Natural (Dried on rooftops)',
                grade: 'Mattari',
                flavor_profile: {
                    acidity: 7.0,
                    bitterness: 4.0,
                    sweetness: 7.5,
                    floral: 5.0,
                    notes: ['Rượu vang đỏ', 'Sô-cô-la', 'Gia vị', 'Nho khô'],
                },
                grind_options: ['whole', 'filter'],
                weight_options: [100, 250],
            }

        })
        console.log(updatedProduct);
        expect(updatedProduct.id).toBe(testProductId);
        expect(updatedProduct.price_per_unit).toBe(60000)

    })

    test('TC02: Cập nhật giá sản phẩm qua method PATCH', async ({ productService }) => {
        const patched = await productService.patchProduct(testProductId, {
            name: 'PATCH 123',
        });
        expect(patched.name).toBe('PATCH 123');
    });
});

// npx playwright test product-service --config playwright.lessons.config.ts --project=neko-api --workers=1
// chạy 2 worker cùng lúc trong trường hợp này bị : race condition =>Nghĩa là 1 sản phẩm cùng lúc vừa bị put và patch tác động
//có thể chạy với beforeEach và afterEach

//soft assertion :



// test('TC01.Hard assertion - Dung ngay khi fail', async ({ productService }) => {
//     const response = await productService.getProduct(1);

//     expect(response.id).toBe(2);
//     expect(response.name).toBeTruthy();
// });




// test('TC01.Soft assertion - Dung ngay khi fail', async ({ productService }) => {
//     const response = await productService.getProduct(2);
//     console.log('Assertion 1 . id = 999');
//     expect.soft(response.id, 'id phai la 999').toBe(9999);

//     console.log('Assertion 2. name = xyz');
//     expect.soft(response.name, 'name phai la xyz').toBe('XYZ');

//     console.log('Assertion 3. Price > 0 ');
//     expect.soft(response.price_per_unit, 'price lon hon khong').toBeGreaterThan(0);

//     console.log('Assertion 4. Type = xxx');
//     expect.soft(response.type, 'Type phai la xxx').toBe('XXXX');

//     console.log('Assertion 5. Is active ');
//     expect.soft(response.is_active, 'isActive').toBe(true);
// });
