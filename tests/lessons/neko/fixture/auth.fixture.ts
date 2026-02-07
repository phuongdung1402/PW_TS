import { test as base, Page} from '@playwright/test';

// 1.MENU CỔNG AN NINH
export type AuthFixtures = {
    authedPage: Page; // Trang CRM đã được đăng nhập
}

// 2.LOGIC 
export const auth = base.extend<AuthFixtures>({
    authedPage: async ({ page }, use) => {

        await use(page);
    },
});