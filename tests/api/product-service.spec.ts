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

    test.beforeAll(async ({ productService }) => {
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
        console.log('Created test product');

    });

    test.afterAll(async ({ productService }) => {
        await productService.deleteProduct(testProductId);
        console.log('Deleted test product');
    });

    test('Cập nhật toàn bộ product ( đầy đủ required fields)', async ({ productService }) => {
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
        expect (updatedProduct.id).toBe(testProductId);
        expect (updatedProduct.price_per_unit).toBe(60000)

    })

})