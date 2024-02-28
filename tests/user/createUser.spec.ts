import { test, expect } from '@playwright/test';
import { user } from '../../models/user/user';

test("Create a new user", async ({ request }) => {

  // creating a post request with random user data
  const response = await request.post(`user`, {
    data: user,
  });

  // getting the response and fetching user id
  const result = await response.json();

  // assert that api is working as expected
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

});