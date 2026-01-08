import {test as base} from '@playwright/test'

//giả lập database chung
const databaseChung: string[] = [];

//Định nghĩa TYPE hay là menu mà con robot sẽ phục vụ
type DatabaseFixture = {
    addAdminUser: string[];
};

//Viết extend -> dạy robot cách học
export const test = base.extend<DatabaseFixture>({
    addAdminUser:async ({}, use) => {
        //GD1 : Setup
        console.log(`[SETUP] Thêm user admin`);
        databaseChung.push('Admin');

        //GD2: Handover
        await use(databaseChung);

        //GD 3 :Teardown ( luon chay ke ca test pass hay fail) 
        console.log(`[Teardown] Đang dọn dẹp ... Xóa admin khỏi DB`);
        databaseChung.pop();
        console.log(`[Teardown] Hiện tại DB có: `, databaseChung);
    }
})