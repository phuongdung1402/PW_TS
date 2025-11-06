import { test, expect } from '@playwright/test';


// test('Chờ trang load hoàn toàn', async ({page})=> {
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev/')
//     const endTime = performance.now()
//     console.log('DEMO LOAD');
//     console.log('Time : ', (endTime-startTime));
    
// })

// test('DomContentLoaded', async ({page})=> {
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev/', {waitUntil: 'domcontentloaded'})
//     const endTime = performance.now()
//     console.log('DOM CONTENT LOADED');
//     console.log('Time : ', (endTime - startTime));
// })

// test('Networkidle' , async ({page})=> {
//     const startTime = performance.now()
//     await page.goto('https://playwright.dev/', {waitUntil : 'networkidle'})
//     const endTime = performance.now()
//     console.log('NETWORK IDLE');
//     console.log('Time : ', (endTime-startTime));
// })

test('AutoWaiting...', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name:'Bài 1: Auto-Wait Demo'}).click()
    // await page.getByRole('button', {name:'🚀 Bắt đầu Test'}).click()
    // await page.locator('#button-1').click()
    // await page.locator('#button-2').click()


    await page.locator('#start-btn').click()
    await page.locator('#continue-btn').click()
    await page.locator('#final-btn').click()


})