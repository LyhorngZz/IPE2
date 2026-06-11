import { test, expect } from '@playwright/test';

test('locked user cannot login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: /login/i }).click();

    await expect(
        page.locator('[data-test="error"]')
    ).toContainText('Sorry, this user has been locked out');
});

test('sort products low to high', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: /login/i }).click();

    await page.locator('[data-test="product-sort-container"]')
        .selectOption('lohi');

    const prices = await page
        .locator('.inventory_item_price')
        .allTextContents();

    const numbers = prices.map(price =>
        Number(price.replace('$', ''))
    );

    expect(numbers[0]).toBe(Math.min(...numbers));
});

test('user can logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: /login/i }).click();

    await page.locator('#react-burger-menu-btn').click();

    await page.getByRole('link', { name: /logout/i }).click();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/'
    );

    await expect(
        page.getByRole('button', { name: /login/i })
    ).toBeVisible();
});