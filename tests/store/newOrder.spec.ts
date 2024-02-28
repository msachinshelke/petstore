import { test, expect } from "@playwright/test"
import { order } from "../../models/strore/order";
import { deleteOrder } from "../../api/strore/order";

test.describe("Create a new pet order", () => {
    test.afterAll(async () => { 
        await deleteOrder(order.id)
    });

    test("Create a new pet order", async ({ request }) => {
        const newOrder = await request.post(`store/order`, {
            data: order
        })

        // assert that api is working as expected
        expect(newOrder.ok()).toBeTruthy();
        expect(newOrder.status()).toBe(200);

        expect(await newOrder.json()).toEqual(order);
    });
});