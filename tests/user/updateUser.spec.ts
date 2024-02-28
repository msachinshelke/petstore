import { test, expect } from '@playwright/test';
import { createUser, deleteUser, login } from '../../api/user/user';

test.describe("Update user details", () => {
  let userName, password, userID
  let response;
  test.beforeAll(async () => {
     response = await createUser();
    userID = response.userID;
    userName = response.username;
    password = response.password;

    await login(userName, password);

  });


  test.afterAll(async () => {
    await deleteUser(userName);
  })

  test("Update User Details", async ({ request }) => {
    // updating the same user with new details
    const responseUpdate = await request.put('user/' + userName, {
      data: {
        ...response,
        "email": "new-playwright@gustr.com",
      
      },

    });

    // getting the response and fetching user id
    const resultUpdate = await responseUpdate.json();
    const userIDUpdate = resultUpdate.message;

    // assert that api is working as expected
    expect(responseUpdate.ok()).toBeTruthy();
    expect(responseUpdate.status()).toBe(200);
  });
});