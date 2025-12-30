import {test, expect } from './fixture/index2';

test('Khach goi combo sang (Pho + CF den', async ({ phoBo, cafeDen}) => {
    //goi mon tu bep
    console.log(`Khach hang goi mon: ${phoBo} va ${cafeDen}`);
});

// Cách 1 : Dùng spread (...) -> giống như mình có 1 quyển vở trắng (base) : mình chép cthuc toán vào, rồi chép cthuc văn vào 
// và vở đó sẽ có cả 2 cthuc

// Cách 2 : Dùng mergeTests -> giống như mình có 2 quyển vở ( 1 vở toán, 1 vở văn ), mình dán 2 quyển vở đó lại thành 1 quyển vở to hơn , và