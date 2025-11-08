import { expect, Locator, test, Page} from '@playwright/test';
import { addDays, differenceInDays, format, getMonth, getYear, isValid, parse, subDays } from 'date-fns';
import { constructFromSymbol } from 'date-fns/constants';


test('ví dụ date picker', async ({page})=> {
    // Date là 1 đối tượng object o trong JS/TS{}
    // HN + 7 -> UTC - 7
    // const now = new Date()
    // //console.log(now);

    // console.log(now.getFullYear());
    // console.log(now.getMonth());
    // console.log(now.getDate());
    
    // //yyyy-mm-ddT
    // const specifiDate = new Date('2025-01-30T10:00:00')
    // console.log(specifiDate);
    
    // const today = new Date()
    // const formatDate = format(today, 'dd/MM/yyyy')
    // console.log(formatDate);
    // const formattedTime = format(today, 'HH:mm:ss')
    // console.log(formattedTime);
    
    // const today2 = new Date('2025-11-08')
    // const inTenDays = addDays(today2, 10)
    // console.log(inTenDays);
    // const inTenDaysAgo = subDays(inTenDays,10)
    // console.log(inTenDaysAgo);

    // const dateA = new Date('2025-11-11')
    // const dateB = new Date('2025-11-06')

    // const daysBetween = differenceInDays(dateA,dateB)
    // console.log(`B hon A ${daysBetween} ngay`);
})

test('ví dụ về date picker2', async ({page})=> {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', {name : 'Bài 4: Mouse Actions'}).click()
    await page.getByRole('tab', {name:'📅 jQuery Date Picker'}).click()
//div[contains(@class, 'ant-card ')]
//=> Tìm tất cả thẻ div có chứa class là ant-card
//Là trong cái thẻ div đấy phải có chứa thẻ div con có chứa class : ant-card-head-title và có chứa text() Demo2: Dropdown Navigation
//Quan trọng nhất là dấu "." ( tìm thẻ con của thẻ div đầu tiên)
// [.//div[contains(@class, 'ant-card-head-title') and normalize-space()='Demo 1: Date Picker cơ bản (HTML table)']]
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    const y = lastMonth.getFullYear()
    // yyyy/mm/dd
    const m = String(lastMonth.getMonth()+1).padStart(2, '0')
    const d = '15'
    const ymdd = `${y}-${m}-${d}`
    await selectDateDemo2(page, ymdd)
    await page.pause()

})

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December']

async function openAntSelectedByCardTitle(page : Page, cardTitle : string, index : number) {
    ////div[contains(@class, 'ant-card ')][.//div[contains(@class, 'ant-card-head-title') and normalize-space()='Demo 2: Dropdown Navigation + Today highlight + Disable future dates']]//div[contains(@class, 'ant-select ')]//div[contains(@class, 'ant-select-selector')]
    const card = page.locator(
        `xpath=//div[contains(@class, 'ant-card ')][.//div[contains(@class, 'ant-card-head-title') and normalize-space()='${cardTitle}']]`
    )
    const selects = card.locator(
        "xpath=.//div[contains(@class, 'ant-select ')]//div[contains(@class, 'ant-select-selector')]"
    )
    const selector = selects.nth(index-1)
    await selector.click()
    const dropdown = page.locator('.ant-select-dropdown::visible').first()
    return dropdown;
}

//div[contains(@class, 'ant-select-dropdown') and not(contains(@style, 'display:none'))]
//div[contains(@class, 'ant-select-item-option-content') and normalize-space()='January']

async function pickAntOptionByText(page: Page, text: string) {
    const option = page.locator
    (`//div[contains(@class, 'ant-select-dropdown') and not(contains(@style, 'display:none'))]//div[contains(@class,'ant-select-item-option-content') and normalize-space()='${text}']`).first()
    await option.scrollIntoViewIfNeeded()
    await option.click()
}

async function selectDateDemo2(page: Page, ymd: string){
    const monthYearText = page.locator('#dp2-month-year')

    //validate input
    const parsed = parse(ymd, 'yyyy-MM-dd', new Date())
    if(!isValid(parsed)) {
        throw new Error('Ngay khong hop le'+ ymd)
    }

    const today = new Date()
    today.setHours(0,0,0,0)
    if(parsed > today){
        throw new Error('Khong the chon ngay tuong lai' +ymd)
    }

    const demo2Title = 'Demo 2: Dropdown Navigation + Today highlight + Disable future dates'
    await openAntSelectedByCardTitle(page, demo2Title, 1)
    await pickAntOptionByText(page, monthNames[getMonth(parsed)])

    await openAntSelectedByCardTitle(page, demo2Title, 2)
    await pickAntOptionByText(page, String(getYear(parsed)))


    //Verify
    const targetMonthName = monthNames[getMonth(parsed)]
    const targetYear = getYear(parsed)
    const expectText = `${targetMonthName} ${targetYear}`
    await expect(monthYearText).toHaveText(expectText)

    //tim ngay
    const dayCell = page.locator(`//table[@id='dp2-table']//td[@data-date='${ymd}']`)
    await dayCell.click()
    await expect(page.locator('#dp2-selected')).toHaveText(ymd)
}