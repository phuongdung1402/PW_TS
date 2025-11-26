import { expect } from "playwright/test";
import { BasePage } from "./BasePage";


export class CRMLogin extends BasePage {
    //Khai bao locator 
    private readonly emailInput = this.page.locator('#email')
    private readonly passwordInput = this.page.locator('#password')
    private readonly btnLogin = this.page.getByRole('button', {name:'Login'})

    async goto() {
        await this.page.goto('https://crm.anhtester.com/admin/authentication')
    }

    async expectedOnPage(): Promise<void> {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.page).toHaveURL(/admin\/authentication/)
    }

    async login(email : string, pass: string) {
        await this.emailInput.fill(email)
        await this.logFill(this.emailInput)
        await this.passwordInput.fill(pass)
        await this.logFill(this.passwordInput)
        await this.logClick(this.btnLogin)
        await this.btnLogin.click()
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/admin/)
    }

}