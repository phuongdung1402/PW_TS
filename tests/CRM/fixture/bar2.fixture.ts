import {test as base} from '@playwright/test';

// Món này trả về cái gì ?
export type BarMenu = {
    traSua: string;
    cafeDen: string;
}

//công thức pha chế
export const testBar = base.extend<BarMenu>({
    traSua: async({}, use) => {
        console.log(`Bar dang lac tra sua`);
        const monAn = 'Tra sua tran chan duong den';
        await use(monAn);
    },

    cafeDen: async({}, use)=> {
        console.log('Bar dang pha ca phe');
        const monAn = 'Cf den sai gon';
        await use(monAn);
    },
})
   
