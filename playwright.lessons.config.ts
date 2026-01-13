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

  testDir: './tests',
  testMatch: '**/*.spec.ts',
  //Khai bao global setup & teardown
  // globalSetup: './global-setup.ts',
  // globalTeardown: './global-teardown.ts',
  //testMatch: '**/*.spec.ts',
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

  //timeout : 17000,
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
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },


    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup']
    },


  ],


});
