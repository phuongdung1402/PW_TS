import { faker } from "@faker-js/faker";
import { format } from "date-fns";

//Auto + company name + timestamp
export function generateCompanyName(prefix: string) : string {
    const fakeCompany = faker.company.name()
    const timestamp = format(new Date(), 'HH:mm:ss')
    return `${prefix} ${fakeCompany} ${timestamp}`
} 