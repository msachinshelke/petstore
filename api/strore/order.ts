import { expect, request } from "@playwright/test";
import { order } from "../../models/strore/order";

export async function createOrder() {
    const apiRequest = await request.newContext();

    const newOrder = await apiRequest.post(`store/order`, {
        data: order
    });

    // assert that api is working as expected
    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);

    return (await newOrder.json());
}

export async function deleteOrder(orderId: number) {    // deleting order using orderid
    const apiRequest = await request.newContext();
    const deletOrder = await apiRequest.delete(`store/order/${orderId}`);

    // assert that api is working as expected
    expect(deletOrder.ok()).toBeTruthy();
    expect(deletOrder.status()).toBe(200);
    expect(Number((await deletOrder.json()).message)).toBe(orderId);
}