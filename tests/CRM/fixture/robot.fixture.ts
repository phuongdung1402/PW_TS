// 3 buoc
//1 nhap robot goc ve
//2 day robot cong thuc 
//3 goi mon de kiem tra ( test )

//Bước 1 :
import {test as base} from '@playwright/test'

//Bước 2 : Dạy robot ( Định nghĩa fixture)
// mở rộng ( extend ) bộ não robot gốc
export const test = base.extend<{
    loiChao: string;
}>({
    loiChao: async ({page}, use) =>{
        //GD 1:
        await page.goto('https://playwright.dev');
        const title = await page.title();

        //GD 2: Chạy tới await use() -> STOP -> Trao quyền điều khiển sân chơi cho file test
        await use(`Xin chao! Ban dang o trang ${title}`)

        // GD3 : Dù test có chạy pass hay fail => teardown
    }
});