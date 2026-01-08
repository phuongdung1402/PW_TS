import {test} from './fixture/database.fixture';
import { expect } from '@playwright/test';

//Test 1 : Chay dau tien
//File test là độc lập vs nhau , tránh sự phụ thuộc
test('TestA: Kiem tra so luong user', async({ addAdminUser })=> {
    //Luc nay database dang co ['Admin]
    console.log('Test A chay ....');
    expect(addAdminUser.length).toBe(1)
    //expect(1).toBe(100)
})

test('Test B: Kiem tra user moi', async ({addAdminUser})=> {
    // Database luc nay đáng lẽ chỉ nên có 1 user (của TestB đã tạo ra)
    //Nhưng thực tế đang có ['Admin', 'Admin'] ( 1 cái cũ của test A + cái mới của Test B)
    
    console.log('Test B dang chay');
    console.log('Hien tai database co', addAdminUser);

    expect(addAdminUser.length).toBe(1)  
})

//fixture chaining... hiệu ứng domino
