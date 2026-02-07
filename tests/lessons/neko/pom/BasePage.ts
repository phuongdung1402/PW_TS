import { Locator, Page } from "@playwright/test";


export abstract class BasePage {
    
    constructor(protected page: Page) {}

    async goto() : Promise<void>{ }

    protected async logClick(locator: Locator) {
        const elementInfo = await this.getElementInfor(locator)
        console.log(`[Click] ${elementInfo}`)
    }

    protected async logFill(locator: Locator, value?: string) {
        const elementInfo = await this.getElementInfor(locator)
        const valueInfo = value ? `With value ${value}` : ''
        console.log(`[Fill] ${elementInfo} - ${valueInfo}`);
    }


    //muc dich : la co 1 cai LocatorMap chua tat ca cac locator
    //toi muon locator day có the chua tat ca cac locator ,vdu : css,xpath,getByRole
    //khi toi goi ham get no se goi y cho toi tat ca locator do va tra ve dung gia tri cua no

    // protected get<T extends Record<string, string | ((page: Page) => Locator)>>(
    //     locatorMap: T,
    //     locatorName: keyof T
    // ): Locator {
    //     const locatorDef = locatorMap[locatorName];
    //     if (typeof locatorDef === 'function') {
    //         return locatorDef(this.page)
    //     }
    //     return this.page.locator(locatorDef)
    // }


    // protected createLocatorGetter<T extends Record<string, string | ((page: Page) => Locator)>>(
    //     locatorMap: T) : (locatorName: keyof T) => Locator {
    //     return (locatorName: keyof T): Locator => {
    //         const locatorDef = locatorMap[locatorName];
    //         if (typeof locatorDef === 'function') {
    //             return locatorDef(this.page)
    //         }
    //         return this.page.locator(locatorDef)
    //     }
    // }


    protected async fillWithLog(locator: Locator, value: string,
        option?: {
            isSensitive?: boolean;
            fillOptions?: Parameters<Locator['fill']>[1]
        }) {

        let isSensitive = option?.isSensitive;
        const logValue = isSensitive ? '****' : value
        await this.logFill(locator, logValue)
        await locator.fill(value, option?.fillOptions)
    }


    protected async clickWithLog(locator: Locator, options?: Parameters<Locator['click']>[0]) {
        await this.logClick(locator)
        await locator.click()
    }

    private async getElementInfor(locator: Locator): Promise<string> {
        let text = ''

        try {
            text = await locator.innerText()
            text = text.trim()
        } catch {
            try {
                const textContent = await locator.textContent();
                text = textContent?.trim() || ''
            } catch {
                try {
                    const value = await locator.inputValue()
                    if (value) {
                        text = `value=${value}`
                    }
                } catch { }
            }
        }
        return text;
    }


    abstract expectOnPage(): Promise<void>;
}