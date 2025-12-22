import {test as base } from '@playwright/test'

export type ElectricityFixture = {
    nguonDien: number;
    oCam : string;
    denBan: string;
};

export const test = base.extend<ElectricityFixture>({
    nguonDien: async({}, use)=> {
        console.log(`[1]. Đóng cầu dao điện. Có điện về bản!`);
        const vol = 220;

        await use(vol);

        console.log(`[1].Cắt cầu dao điện`);
    },

    // mắt xích 2 : trung gian ( ổ điện )
    oCam: async ({nguonDien}, use) => {
        console.log(`[2]. 0 cắm nối vào nguồn ${nguonDien}`);

        const loai0 = '0 Lioa';
        await use(loai0);

        console.log(`[2]. Rút phích cắm ra khỏi ổ`);
    },

    // mắt xích 3
    denBan: async({ oCam}, use)=> {
        console.log(`[3]. Đèn cắm vào ổ ${oCam} và bật đèn`);
        const trangThai = 'Đèn đang sáng';
        await use(trangThai);

        console.log(`[3].Tắt đèn`);

        
    }
})