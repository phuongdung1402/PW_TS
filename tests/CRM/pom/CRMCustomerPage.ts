import { expect } from "playwright/test";
import { BasePage } from "./BasePage";
import { Page } from "playwright";
import { ColumnInfor, ColumnMap, ColumnTextCleaner, createColumnMap, getColumnValuesSimple } from "../helpers/TableColumnHelpers";
import { Locator } from "playwright";
export type CustomerColumnKey = 
  | 'select'
  | 'rowNumber'
  | 'company'
  | 'primaryContact'
  | 'primaryEmail'
  | 'phone'
  | 'actice'
  | 'groups'
  | 'dateCreated';

export class CRMCustomerPage extends BasePage {
    private columnMapCache: ColumnMap | null = null;
    
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

    private getRowsLocator() : Locator {
        return this.element('tableRows')
    }

    async waitForTableReady() {
        //btn loading
        const processing = this.element('tableProcessing');
        await expect(processing).not.toBeVisible()

        const headers = this.element('tableHeaders')
        await expect(headers.first()).toBeVisible()

        const rows = this.getRowsLocator()
        await expect(rows.first()).toBeVisible()
    }

     private async ensureColumnMapCache(): Promise<ColumnMap> {
        if(!this.columnMapCache){
            await this.waitForTableReady();
            this.columnMapCache = await createColumnMap(this.element('tableHeaders'));
        }
        return this.columnMapCache;
    }


    async getRowCount(): Promise<number> {
        await this.waitForTableReady();
        return this.getRowsLocator().count()
    }

    private get columnCleaner() : Record <string,ColumnTextCleaner> {
        return {
            company: async (cell: Locator) => {
                const linkText = await cell.locator('a').first().textContent();
                if(linkText && linkText.length > 0) {
                    return linkText;
                }
                const raw = (( await cell.textContent()) || '').trim()
                const actionIndex = raw.indexOf('View')

                return actionIndex > 0 ? raw.slice(0,actionIndex).trim() : raw
            }
        }
    }


    async getCoumnValues(coLumnKey: CustomerColumnKey | string) {
        await this.waitForTableReady();
        const columnMap = await this.ensureColumnMapCache();
        return getColumnValuesSimple(
            this.element('tableHeaders'), 
            this.getRowsLocator(), 
            coLumnKey, 
            this.columnCleaner,
            columnMap);
    }



    private async buildColumnMap() : Promise<ColumnMap> {
        const headers = this.element('tableHeaders');
        return createColumnMap(headers)
    } 

    async clickAddNewCustomer() {
        await this.clickWithLog(this.element('newCustomerLink'))
    }
}
