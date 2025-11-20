import { Locator, Page } from "playwright";

export abstract class BasePage {

    constructor(protected page : Page){}

    protected async logClick(locator :  Locator){
        const elementInfo = await this.getElementInfor(locator)
        console.log(`[Click] ${elementInfo}`)
        
    }

    protected async logFill(locator : Locator) {
        const elementInfo = await this.getElementInfor(locator)
        console.log(`[Fill] ${elementInfo}`);
        
    }
    private async getElementInfor(locator : Locator) : Promise<string> {
        const text = await locator.innerText().catch(()=>'' )
        return text;
    }

    abstract expectOnPage() : Promise<void>;
}