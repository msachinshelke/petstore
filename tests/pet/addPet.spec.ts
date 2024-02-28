import { test, expect } from "@playwright/test"
import { pets } from "../../models/pet/pets";

test.describe("Add a new pet", () => {
  for (const pet of pets) {
    test(`Create a ${pet.name} pet`, async ({ request }) => {
      const response = await request.post(`pet`, {
        data: pet.pet
      });

      // assert that api is working as expected
      expect(response.status()).toBe(pet.status);

    });
  }
});