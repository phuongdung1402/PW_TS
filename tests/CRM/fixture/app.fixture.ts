import { Fixtures, PlaywrightTestArgs} from '@playwright/test'
import { AuthFixtures } from "./auth.fixture";

// Import POM
import { CRMDashboardPage } from "../pom/CRMDashboardPage";
import { CRMCustomerPage } from "../pom/CRMCustomerPage";
import { CRMNewCustomerPage } from "../pom/CRMNewCustomerPage";



export type AppFixtures = {
    dashboardPage: CRMDashboardPage;
    customersPage: CRMCustomerPage;
    newCustomerPage: CRMNewCustomerPage;
};

type AppDeps = PlaywrightTestArgs & AuthFixtures;


export const appFixtures = {
    dashboardPage: async ({authedPage} : AppDeps, use: (r: CRMDashboardPage)=> Promise<void>) => {
        //Cách này : có thể viết luôn expectOnPage vào đây
        const page = new CRMDashboardPage(authedPage)
        await page.expectOnPage()
        await use(page);

        //await use(new CRMDashboardPage(authedPage));
    },

    customersPage: async ({authedPage} : AppDeps, use: (r: CRMCustomerPage)=> Promise<void>) => {
        await use(new CRMCustomerPage(authedPage));
    },

    newCustomerPage: async ({authedPage} : AppDeps, use: (r: CRMNewCustomerPage) => Promise<void>) =>{
        await use(new CRMNewCustomerPage(authedPage))
    }
}