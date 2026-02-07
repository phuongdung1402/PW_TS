import { Fixtures, PlaywrightTestArgs} from '@playwright/test'
import { AuthFixtures } from "./auth.fixture";
// Import POM
import { ProductPage } from "../pom/ProductPage";



export type AppFixtures = {
    productPage : ProductPage;
};

type AppDeps = PlaywrightTestArgs & AuthFixtures;


export const appFixtures = {
    productPage: async ({authedPage} : AppDeps, use: (r: ProductPage)=> Promise<void>) => {
        //Cách này : có thể viết luôn expectOnPage vào đây
        const page = new ProductPage(authedPage);
        await page.goto();
        await use(page);

        
    },

  
}