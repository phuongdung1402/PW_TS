// import {test as base} from '@playwright/test'

// export const test = base.extend<{
//     randomNumber: number;
//     greeting: string;
//     userInfo: {name: string; age: number; email: string};
// }>({
//     randomNumber: async({}, use) => {
//         const number = Math.floor(Math.random() * 100) + 1;
//         await use(number)
//     },

//     greeting: async({}, use) => {
//         const message = 'hello, world';
//         await use(message);
//     },
//     userInfo: async({}, use) => {
//         const user = {
//             name: 'Teo',
//             age: 18,
//             email: 'Teo@gmail.com',
//         };
//         await use(user)
//     }

// })

import { test as base} from '@playwright/test'

export const test = base.extend<{
    age : number;
    name: string
}>({
    age: async({}, use) => {
        const ageNew = 50;
        await use(ageNew)
    },

    name : async({}, use)=> {
        const nameNew = 'Phuong dung';
        await use(nameNew)
    }
})