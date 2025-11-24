import { expect } from "playwright/test";
import { BasePage } from "./BasePage";

export class CRMLoginPage extends BasePage{
    // khai bao Locator
    private readonly emailInput = this.page.locator('#email')
    private readonly passwordInput = this.page.locator('#password')
    private readonly loginButton = this.page.getByRole('button', {name: 'Login'})

    async goto() {
        await this.page.goto('https://crm.anhtester.com/admin/authentication')
    }
    async expectOnPage(): Promise<void> {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.page).toHaveURL(/admin\/authentication/)
    }

    async login(email:string, password: string) {
        await this.fillWithLog(this.emailInput, email)
        await this.fillWithLog(this.passwordInput, password, {isSensitive : true, fillOptions : {timeout: 1000}})
        await this.passwordInput.fill(password)
       
        //this.logClick(this.loginButton)
        await this.clickWithLog(this.loginButton, {force :true, timeout: 10000})
        //await this.loginButton.click()
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/admin/)
    }
}

