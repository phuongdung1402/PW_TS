import { Locator, Page } from "playwright";

export class BasePage {
    constructor(protected page: Page) { }
    protected async logClick(locator: Locator) {
        const elementInfor = await this.getElementInfor(locator)
        console.log(`[CLICK] : ${elementInfor}`)
    }

    protected async logFill(locator: Locator) {
        const elementInfor = await this.getElementInfor(locator)
        console.log(`[FILL] ${elementInfor}`)
    }

    private async getElementInfor(locator: Locator) {
        let text = '';

        try {
            text = await locator.innerText();
            text = text.trim();

        } catch {
            try {
                const textContent = await locator.textContent();
                text = textContent?.trim() || ''
            } catch {
                try {
                    const value = await locator.inputValue();
                    if (value) {
                        text = `Value ${value}`
                    }
                }catch{}
            }
        }

        return text;
    }
    async expectedOnPage(): Promise<void> {}
}