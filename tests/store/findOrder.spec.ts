import { test, expect } from "@playwright/test";
import { createOrder, deleteOrder } from "../../api/strore/order";

test.describe("Fetch Order", () => {
    let order;

    test.beforeAll(async () => {
        order = await createOrder();
    });

    test.afterAll(async () => {
        await deleteOrder(order.id)
    });

    test("Fetch Order using id", async ({ request }) => {
        const response = await request.get(`store/order/${order.id}`)

        // assert that api is working as expected
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect((await response.json()).petId).toBe(order.petId);
    });
});