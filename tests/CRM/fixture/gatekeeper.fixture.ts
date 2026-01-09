import {auth, AuthFixtures} from './auth.fixture'
import { appFixtures, AppFixtures } from './app.fixture'

export type GatekeeperFixtures = AuthFixtures & AppFixtures;

export const test = auth.extend<AppFixtures>({
    ...appFixtures,
});

export {expect} from '@playwright/test'



//3 giai đoạn
//Level 0: Base robot
//Level 1 : Auth robot : mình lấy con base dạy nó kĩ năng đăng nhập -> kết quả tạo ra robot bảo vệ(biết tạo ra authedPage)
//Level 2 : AppRobot - Gatekeeper : mình lấy con auth + dạy kĩ năng nghiệp vụ ( vào dashboard , tạo khách hàng) -> SIÊU ROBOT biết cả login lẫn nghiệp vụ

