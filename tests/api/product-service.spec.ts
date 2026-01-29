import {test, expect} from './fixtures/gatekeeper.api.fixture';

test.describe('Products Service test', ()=> {
    test('TC01. Get products list', async({ productService})=> {
        const response = await productService.getProducts( {limit: 5});
        console.log('Total', response.pagination.total_items);
        console.log('Products', response.data.length);
        console.log('All products', response.data);
    })
})