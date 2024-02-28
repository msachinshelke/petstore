import { test, expect } from "@playwright/test"
import { createPet } from "../../api/pet/pet";
import { pet } from "../../models/pet/pet";

test.describe("Update pet", () => {
  let petId;

  /** Create a pet before it can be deleted */
  test.beforeAll(async () => {
    // saving the pet id of the newly created pet
    petId = await createPet(pet)
  })

  test("Update valid pet", async ({ request }) => {
    // updating the created pet
    const pet = {
      data: {
        "id": petId,
        "category": {
          "id": 8077,
          "name": "dog"
        },
        "name": "Duffy",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 7017,
            "name": "black"
          }
        ],
        "status": "available"
      }
    };

    const updateResponse = await request.put(`pet`, pet)

    // assert that api is working as expected
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updatedPet = await updateResponse.json();

    // assert that correct changes were made
    expect(updatedPet).toEqual(pet.data);
  });
});