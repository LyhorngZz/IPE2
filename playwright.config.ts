import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    retries: 2,

    workers: 1,

    reporter: 'html',

    use: {
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        headless: true,
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        {
            name: 'edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
            },
        },
    ],
});