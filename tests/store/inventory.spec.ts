import { test, expect } from '@playwright/test'

test("Get inventory details", async ({ request }) => {

    const response = await request.get(`store/inventory`);

    // get the inventory details
    const inventory = await response.json();

    // assert that api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});