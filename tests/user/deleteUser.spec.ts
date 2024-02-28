import { test, expect } from '@playwright/test';
import { createUser, deleteUser, login } from '../../api/user/user';

test.describe("Delete User", () => {
  let userName, password, userID

  test.beforeAll(async () => {
    const response = await createUser();
    userID = response.userID;
    userName = response.username;
    password = response.password;

    await login(userName, password);

  });

  test("Delete valid user", async ({ request }) => {
    // deleting the user
    await deleteUser(userName);
  });

  test("Delete an invalid user", async ({ request }) => {
    const responseDelete = await request.delete(`user/invalidUser12987`);

    // assert that api is working as expected
    expect(responseDelete.ok()).toBeFalsy();
    expect(responseDelete.status()).toBe(404);
  });
});