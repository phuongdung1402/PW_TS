import {test} from '@playwright/test'

test.beforeAll(async ()=> {
    console.log('------ Before All----------');
    
})

test('Kiem tra bien moi truong', async ({page})=> {
    const dbURl = process.env.DB_CONNECTION_URL;
    const port = process.env.API_PORT;

    console.log(` Dang ket noi toi ${dbURl}`);
    console.log(` Port hoat dong ${port}`);
    
    
    
})