// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
const env = process.env.ENV || 'uat';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Changes whether the tests in files run in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Adding only 1 worker since the same user can be logged in once. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  use: {
      ...devices['Desktop Chrome'],
      trace: 'retain-on-failure',
      headless: false,
      viewport: { width: 1800, height: 950 },
      launchOptions: {
        slowMo: 3000
      }
  },
  /* Configure projects for different environments. */
  projects: [
    {
      name: 'dev',
      use: {
         baseURL: 'https://dev.diy.gowhere.gov.sg',
        },
    },
    {
      name: 'uat',
      use: {
         baseURL: 'https://uat.diy.gowhere.gov.sg',
        },
    }
  ],
});

