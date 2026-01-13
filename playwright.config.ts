import { defineConfig, devices } from '@playwright/test';
import DotenvFlow from 'dotenv-flow';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';

}

DotenvFlow.config({
  default_node_env: 'development',
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //testMatch: '**/*'
  //testDir: './homeworks',
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  //Khai bao global setup & teardown
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  /* Run tests in files in parallel */

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  //timeout : 20000,

  use: {
    baseURL: 'https://crm.anhtester.com',
    //actionTimeout: 15000,
    headless: false,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // expect: {
  //   timeout: 7000
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global',
      testMatch: '**/*.spec2.ts',
      use: {
        browserName: undefined
      }
    },

    // //project chuyen chay api
    // {
    //   name: 'api-engine',
    //   testMatch: '**/api/*.spec1.ts',
    //   use: {
    //     browserName: undefined

    //   }
    // },

    // //project desktop chay UI
    // {
    //   name: 'desktop-chrome',
    //   testMatch: '**/ui/*.spec1.ts',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     headless: true

    //   }
    // },

    // //project chuyen chay ui phone
    // {
    //   name: 'mobile-ios',
    //   testMatch: '**/ui/*.spec1.ts',
    //   use: {
    //     ...devices['iPhone 12 Pro Max'],
    //     headless: true,
    //   }
    // },

    {
      name: 'chromium-standard',
      use: { 
        browserName:'chromium',
        //ko ghi đè gì cả -> kế thừa toàn bộ của global use  
      },
    },


    // Thực hiện ghi đè -> ưu tiên trong prj
    // {
    //   name: 'firefox-debug',
    //   use: { 
    //     browserName: 'firefox',
    //     headless:false,
    //     video:'on',
    //     launchOptions: {
    //       slowMo: 1000,
    //     }
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
