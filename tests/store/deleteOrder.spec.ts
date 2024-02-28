import { test, expect } from "@playwright/test"
import { createOrder } from "../../api/strore/order";

test.describe("Delete an order", () => {
    let orderId;

    test.beforeAll(async () => {
        orderId = (await createOrder()).id;
    });

    test("Delete order", async ({ request }) => {
        // delete order using orderid
        const deletOrder = await request.delete(`store/order/${orderId}`);

        // assert that api is working as expected
        expect(deletOrder.ok()).toBeTruthy();
        expect(deletOrder.status()).toBe(200);
        expect(Number((await deletOrder.json()).message)).toBe(orderId);
    });
});