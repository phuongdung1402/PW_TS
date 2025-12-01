import { expect } from "playwright/test";
import { BasePage } from "./BasePage";
import { Page } from "playwright";
import { ColumnMap } from "../helpers/TableColumnHelpers";

export class CRMCustomerPage extends BasePage {
    
    private readonly pageLocators = {
       newCustomerLink : (page: Page) => page.getByRole('link', {name : 'New Customer'}),

       tableHeaders : '#clients thead th',
       tableRows : '#client tbody tr',
       searchInput : '#clients_filter input[type="Search"]',
       tableProcessing : '#clients_processing'
    } as const

    public element = this.createLocatorGetter(this.pageLocators)

    async expectOnPage(): Promise<void> {
        await expect(this.element('newCustomerLink')).toBeVisible();
    }

    async waitForTableReady() {
        const processing = this.element('tableProcessing');
        await expect(processing).not.toBeVisible()

        const headers = this.element('tableHeaders')
        await expect(headers.first()).toBeVisible()
    }

    private async buildColumnMap() : Promise<ColumnMap> {
        const headers = this.element('tableHeaders');
        return createColumnMap(headers)
    } 

    async clickAddNewCustomer() {
        await this.clickWithLog(this.element('newCustomerLink'))
    }


}