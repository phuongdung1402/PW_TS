import {test} from '@playwright/test'

// VÙNG 1 : TOP LEVEL SCOPE (Code nằm ngoài cùng)
// Dòng này sẽ chạy khi file đc import/load
console.log(`[TOP-LEVEL] Đang đọc file .... (PID : ${process.pid})`);

const DATA_HEAVY = {id : 1, name : 'Big Data'};

test.describe('Nhóm test demo', ()=> {
    // VÙNG 2 : DESCRIBE SCOPE (Code nằm trong nhóm)
    // Dòng này cũng chạy ngay khi file load để đăng kí nhóm
    console.log(`[DESCRIBE] Đang đăng kí Group ... (PID: ${process.pid})`);

    test('Test Case A', async ({})=> {
        //VÙNG 3: TEST BODY (Code nằm trong bài test)
        // Dòng này chỉ chạy khi trình duyệt mở 
        console.log(`[TEST BODY] Bắt đầu chạy Test A.... (PID: ${process.pid})`);

        //Chứng mình worker có thể đọc được biến ở top level
        console.log(`  -> Worker đọc dữ liệu : ${DATA_HEAVY.name}`);
    }); 
});

