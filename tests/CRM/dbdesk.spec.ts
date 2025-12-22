import {test} from './fixture/deskSetup.fixture';
import { expect } from 'playwright/test';

test('Đọc sách', async ({denBan})=> {
    console.log(`Khách: ${denBan} đang đọc sách`);
    
});

// cái gì bật sau cùng phải tắt đầu tiên
//thứ tự : setup -> 1-> 2 -> 3
//tearDown -> 3 -> 2 -> 1
// thằng nào setup đầu tiên thì teardown cuối cùng