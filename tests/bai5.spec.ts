import { test, expect } from '@playwright/test';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/'

// test('Get text()', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   const parent = page.locator('#demo-element-1')
//   const text1 = await parent.textContent()

//   const text2 = await parent.innerText()

//   const text3 = await parent.innerHTML()

//   console.log('text1' , text1);
//   console.log("text2" , text2);
//   console.log("text3" , text3);
// });


// test('Get text() visibility : hidden', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   const parent = page.locator('#demo-element-2')
//   const text1 = await parent.textContent()

//   const text2 = await parent.innerText()

//   const text3 = await parent.innerHTML()

//   console.log('text1' , text1);
//   console.log("text2" , text2);
//   console.log("text3" , text3);
// });

test('allTextContent', async ({ page }) => {
  await page.goto(DEMO_URL);
  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
  const parent = page.locator('#demo-dropdown')
  const allText = await parent.allTextContents()
  console.log('allText', allText);
  const allTextInner = await parent.allInnerTexts()
  console.log('allTextInner', allTextInner);

  // const innerThongThuong = await parent.innerText()
  // console.log(innerThongThuong);

  // const contentText = await parent.textContent()
  // console.log(contentText);

});

// test('allTextContent', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   const listItem = page.locator('.demo-list-item')
//   const allText = await listItem.allTextContents();
//   console.log(allText);
  
// });


// test('inputValue(), getAttribute()', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   const parent = page.locator('#demo-input-text')
//   const inputValue = await parent.inputValue()
//   console.log(inputValue);

//   const attribute = page.locator('#demo-attributes')
//   const dataSource = await attribute.getAttribute('data-status')
//   const dataSource2 = await attribute.getAttribute('data-id')
//   console.log(dataSource);
//   console.log(dataSource2);
  
// });

//----------------------------------------------

// test('Get text', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   await page.getByRole('tab', {name: 'Expect Assertions'}).click()
//   const name = await page.locator('#profile-name').innerText()
//   console.log(name);
  
//   expect(name).toBe('Playwright Learner')
// });



// test('Get text', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   await page.getByRole('tab', {name: 'Expect Assertions'}).click()
//   //const userProfile : {id : number, role : string, active : boolean, premium : boolean}
//   const userProfile = await page.locator('#profile-json').innerText()
//   const obj = JSON.parse(userProfile)
//   console.log(userProfile);
  
//   console.log(obj);
  
//   expect(userProfile).toEqual({"id": 101,
//   "role": "student", 
//   "active": true,
//   "premium": false})
  
// });


// test('Get text', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   await page.getByRole('tab', {name: 'Expect Assertions'}).click()
//   const result = await page.locator('#categories li').allInnerTexts()
//   console.log(result);
//   expect(result).toContain('🎧 Audio')
//  // expect(result).toContain('Category')
//   expect(result.length).toBe(3)
// });


// test('Get text', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   await page.getByRole('tab', {name: 'Expect Assertions'}).click()
//   const result = await page.locator('#in-stock-flag').getAttribute('data-value')
//   const st = Boolean(result)
//   expect(st).toBeTruthy()
// });

// .toHavePropert
// test('toHaveProperty', () => {
//   const user = {
//     id: 1,
//     name: 'Alice',
//     adress: {
//       street: '123 THD',
//       city: 'HN',
//     },
//     isActive: true,
//   };
//   expect(user).toHaveProperty('name');
//   expect(user).toHaveProperty('name', 'Alice');
//   expect(user).toHaveProperty('adress.city');
//   expect(user).toHaveProperty('adress.city', 'HN');
//   expect(user).toHaveProperty('isActive', true);
// });


//toHaveLength
// test('toHaveLength', () => {
//   const fruits = ['Cam', 'Xoai', 'Chuoi'];
//   const emptyArry: string[] = [];
//   expect(fruits).toHaveLength(3);
//   expect(emptyArry).toHaveLength(0);
//   expect(emptyArry).toBeTruthy()
// });


// test('objectContaining', ()=>{
//     const apiResponse = {
//            id: 'txn-123',
//     status: 'completed',
//     amount: 50,
//     timeStamp: '2025-10-28',
//   };
//   const expectedCoreData = {
//     amount: 50,
//     status: 'completed',
//   };
//   expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));
//   //Fail -> object cha ko có cặp key value là status: pending
//   // expect(apiResponse).toEqual(expect.objectContaining({ status: 'pending' }));
// });

// test('arrayContaining', ()=> {
//     const userPermissions = ['read', 'write', 'comment', 'delete']
//     const requiredPermission = ['delete', 'read']

//     expect(userPermissions).toEqual(expect.arrayContaining(requiredPermission))
// })

// test('objectContainingnested', () => {
//   const apiResponse = {
//     id: 'txn-123',
//     status: 'completed',
//     user: {
//       id: 'user=123',
//       name: 'Alice',
//       email: 'Alice@gmail.com',
//     },
//     amount: 50,
//     timeStamp: '2025-10-28',
//   };
//   const expectedCoreData = {
//     status: 'completed',
//     user: expect.objectContaining({
//       id: 'user=123',
//       name: 'Alice',
//     }),
//   };
//   expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));
// });

// interface IMovieData {
//     id: number;
//     title : string;
    

//     isLike : boolean
//     inList : boolean

// }


// test('Bài tập UI Movies', async ({ page }) => {
//   await page.goto(DEMO_URL);
//   await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
//   await page.getByRole('tab', { name: 'Expect Assertions' }).click();
//   //1 tìm locator của 4 thẻ phim
//   const movieCards = await page
//     .locator(
//       "//span[text()='Danh sách phim']/ancestor::div[@class='ant-card-head']/following-sibling::div//div[contains(@class,'movie-card')]"
//     )
//     .all();
//   console.log('Số lượng movies,', movieCards.length);
//   expect(movieCards).toHaveLength(4);
//   const moviesData: IMovieData[] = [];
//   for (let i = 0; i < movieCards.length; i++) {
//     //index =0 => slient code
//     const card = movieCards[i];
//     //lấy thông tin về thẻ phim
//     const dataTitle = await card.getAttribute('data-title');
//     console.log(dataTitle);
//     const dataYear = await card.getAttribute('data-year');
//     const dataRating = await card.getAttribute('data-rating');
//     const dataGenres = await card.getAttribute('data-genres');
//     const titleText = await card.locator('.ant-card-meta-detail span').nth(0).innerText();
//     console.log('TitleTExt', titleText);
//     const ratingText = await card.locator('.ant-card-meta-detail span').nth(1).innerText();
//     console.log('ratingText', ratingText);
//     const yearText = await card.locator('.ant-card-meta-description div').nth(0).innerText();
//     console.log('yearText', yearText);
//     await page.pause();
//   }
// });