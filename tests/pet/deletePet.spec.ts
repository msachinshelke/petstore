import { test, expect } from "@playwright/test"
import { pet } from "../../models/pet/pet";
import { createPet } from "../../api/pet/pet";

test.describe("Delete a pet", () => {
  let petId;

  /** Create a pet before it can be deleted */
  test.beforeAll(async () => {
    // saving the pet id of the newly created pet
    petId = await createPet(pet)
  })

  test("Delete a valid pet", async ({ request }) => {
    // deleting the pet using petid
    const deletePet = await request.delete(`pet/${petId}`, {
      headers: {
        api_key: "special-key",
      }
    })

    // assert that api is working as expected
    expect(deletePet.ok()).toBeTruthy();
    expect(deletePet.status()).toBe(200);

    // trigger deletePet request again to assert that pet is deleted
    const getPet = await request.get(`pet/${petId}`);

    // assert that api is working as expected
    expect(getPet.ok()).toBeFalsy();
    expect(getPet.status()).toBe(404);
    expect((await getPet.json()).message).toBe("Pet not found");
  })

  test("Delete an invalid pet", async ({ request }) => {

    // trigger deletePet request for a non existing pet
    const getPet = await request.get(`pet/00000000000000000000000000000000`);

    // assert that api is working as expected
    expect(getPet.ok()).toBeFalsy();
    expect(getPet.status()).toBe(404);
    expect((await getPet.json()).message).toBe("Pet not found");
  });
});