import {test as base, Browser, BrowserContext, Page} from '@playwright/test';

type RoleName = 'admin' | 'staff';

// interface RoleContext {
//     context : BrowserContext;
//     page : Page;
// }

type AsRoleFunction = (role : RoleName) => Promise<Page>

export const test = base.extend<{asRole: AsRoleFunction}>({
    asRole : async ({browser}, use)=> {
        const contexts : BrowserContext[] = [];
        const createRolePage : AsRoleFunction = async (role)=> {
            const storageStagePath = `./auth/${role}.json`;
            console.log(`Loading stotageState ${storageStagePath}`);
            const context = await browser.newContext({
                storageState: storageStagePath,
            });
            contexts.push(context);

            const page = await context.newPage();
            return page;
        };

        //su dung cho KH
        await use(createRolePage);

        //clean
        console.log('Fixture cleaning up');
        for(const context of contexts) {
            await context.close();
        }
    }
    
})

export {expect} from '@playwright/test'