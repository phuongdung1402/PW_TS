import {test as setup, expect} from '@playwright/test'
import fs from 'fs'
// thư việc fs giúp lưu trữ vào file
import path from 'path'
import { AuthService } from './services/AuthServices';
// thư viện path giúp định nghĩa đường dẫn


const authFile = path.resolve('auth/neko-token.json');


function isTokenValidByExpiresAt(expiresAt: string): boolean {
    if(!expiresAt) return false;

    const expiry = new Date(expiresAt).getTime();

    const now = Date.now();
    const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    return expiry > now + bufferTime;
}


setup('Authentication Neko API', async ({request})=> {
    if(fs.existsSync(authFile)) {
        //logic check token da ton tai chua
        const data = JSON.parse(fs.readFileSync(authFile, 'utf-8'));

        const isValid = data.expires_at ? isTokenValidByExpiresAt(data.expiresAt) : false;

        if(data.token && isValid) {
            console.log('Token còn hạn. skip login');
            return;
        }

        console.log('Token hết hạn. Login lại')

    }

    const authService = new AuthService(request);
    const response = await authService.login('test1', '123456789');

    expect(response.token).toBeTruthy();

    const authDir = path.dirname(authFile);
    if(!fs.existsSync(authDir)){
        fs.mkdirSync(authDir, {recursive: true});
        // recursive: tạo thư mục cha nếu chưa tồn tại
    }

    fs.writeFileSync(authFile, JSON.stringify({token: response.token, expires_at: response.expiresAt}))
})

//logic : Lần đầu tiên đăng nhập chưa có file token thì sẽ đăng nhập và lưu token vào file 
// những lần sau : dựa vào cái expire In để check nếu mà token có hạn thì lấy token từ file ra sử dụng