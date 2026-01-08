import { AuthFixtures } from "./auth.fixture";

// Import POM
import { CRMDashboardPage } from "../pom/CRMDashboardPage";
import { CRMCustomerPage } from "../pom/CRMCustomerPage";
import {CRMNewCustomerPage} from "../pom/CRMNewCustomerPage";
import { PlaywrightTestArgs } from "playwright/test";


export type AppFixtures = {
    dashboardPage: CRMDashboardPage;
    customersPage: CRMCustomerPage;
    newCustomerPage: CRMNewCustomerPage;
};

type AppDeps = PlaywrightTestArgs & AuthFixtures;

export const appFixtures = {
    dashboardPage: async ({ authedPage } : AppDeps, use: ())
} 