import { expect, request } from "@playwright/test";

export async function createPet(pet) {
    const apiRequest = await request.newContext();

    const response = await apiRequest.post(`pet`, {
        data: pet
    })

    // assert that api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const resp = await response.json();

    // assert that data is correct
    expect(resp.category.name).toBe(pet.category.name);
    expect(resp.tags[0].name).toBe(pet.tags[0].name);

    // saving the pet id of the newly created pet
    return resp.id
}

export async function getPet(id: string) {
    const apiRequest = await request.newContext();

    const response = await apiRequest.get(`pet/${id}`);

    // assert that api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    return await response.json();
}

export async function updatePet(pet) { }

export async function deletePet(id: string) {
    const apiRequest = await request.newContext();
    // deleting the pet using petid
    const deletePet = await apiRequest.delete(`pet/${id}`, {
        headers: {
            api_key: "special-key",
        }
    })

    // assert that api is working as expected
    expect(deletePet.ok()).toBeTruthy();
    expect(deletePet.status()).toBe(200);
}