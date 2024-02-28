import { test, expect } from "@playwright/test"
import { createPet, getPet, deletePet } from "../../api/pet/pet";
import { pet } from "../../models/pet/pet";

test.describe("Fetch pet details", () => {
  let petId;

  /** Create a pet before it can be fetched */
  test.beforeAll(async () => {
    // saving the pet id of the newly created pet
    petId = await createPet(pet)
  })

  test.afterAll(async ({ request }) => {
    await deletePet(petId);
  });

  test("Fetch pet detail", async () => {
    // fetch details using petid
    const pet_Info = await getPet(petId)

    // assert that petid is correct
    expect(pet_Info.id).toBe(petId);

  });
});