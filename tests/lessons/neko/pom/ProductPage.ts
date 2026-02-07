import { expect } from 'playwright/test';
import {BasePage} from './BasePage'

export class ProductPage extends BasePage {

    //Locators (product grid)
    private readonly productGrid = this.page.locator('[data-testid="products-grid"]');
    private readonly productCards = this.productGrid.locator('>div');

    async expectOnPage(): Promise<void> {
        await expect(this.page).toHaveURL(/\/products/);
    }

    async clickProduct(productName: string) {
        const productCard = this.productCards.filter({hasText: productName });
        return  this.clickWithLog(productCard)
    }
}