import {test as base} from '@playwright/test';

// Món này trả về cái gì ?
export type KitchenMenu = {
    phoBo: string;
    banhMi: string;
}

//công thức pha chế
export const testKitchen = base.extend<KitchenMenu>({
    phoBo: async({}, use) => {
        console.log(`Bep dang chan nc leo`);
        const monAn = 'Pho bo tai nam';
        await use(monAn);
    },

    banhMi: async({}, use)=> {
        console.log('Bep dang nuong banh mi');
        const monAn = 'Banh mi pate';
        await use(monAn);
    },
})