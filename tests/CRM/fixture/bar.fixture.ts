import {test as base} from '@playwright/test'
import {Fixtures} from '@playwright/test'


// Món này trả về cái gì ?
export type BarMenu = {
    traSua: string;
    cafeDen: string;
}

//công thức pha chế
export const barRecipes: Fixtures<BarMenu> = {
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
}

