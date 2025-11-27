import { Locator, Page } from "playwright";



export class BasePage {
    constructor(protected page: Page) {}

    protected async logClick(locator: Locator) {
        const elementInfo = await this.getElementInfor(locator)
        console.log(`[CLICK] ${elementInfo}`)
    }

    protected async logFill(locator: Locator) {
        const elementInfo = await this.getElementInfor(locator)
        console.log(`[FILL] ${elementInfo}`)
    }



    private async getElementInfor(locator: Locator) : Promise<string> {
        let text = '';
        
        try {
            text = await locator.innerText();
            text = text.trim()
        }catch {
            try {
                const textContent = await locator.textContent()
                text = textContent?.trim() || ''
            } catch {
                try {
                    const value = await locator.inputValue()
                    if( value) {
                        text = `value = ${value}`
                    }
                }catch {}
            }
        }
        return text;
    }

    async expectOnPage() : Promise<void> {}; 


}