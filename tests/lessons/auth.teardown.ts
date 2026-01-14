import {test as teardown} from '@playwright/test'

teardown('Dọn dẹp Database', async ({ })=> {
    console.log('[TEARDOWN] Đang xóa User khỏi Database');
    //Gỉa lập gọi API để xóa user
    console.log('[TEARDOWN] Dọn dẹp hoàn tất');
    
    
})