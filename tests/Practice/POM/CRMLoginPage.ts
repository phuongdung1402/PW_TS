import { expect } from "playwright/test";
import { BasePage } from "./BasePage";



export class CRMLoginPage extends BasePage {

    //Khai bao locator
    private readonly emailInput = this.page.locator('#email')
    private readonly passwordInput = this.page.locator('#password')
    private readonly loginButton = this.page.getByRole('button', {name:'Login'})


    async goto() {
        await this.page.goto('https://crm.anhtester.com/admin/authentication')
    }
    
    async expectOnPage(): Promise<void> {
        await expect(this.emailInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.page).toHaveURL(/admin\/authentication/)
    }

    async login(email : string, password: string) {
        await this.emailInput.fill(email)
        await this.logFill(this.emailInput)
        await this.passwordInput.fill(password)
        await this.logFill(this.passwordInput)
        await this.logClick(this.loginButton)
        await this.loginButton.click()
    }


    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/admin/)
    }


}