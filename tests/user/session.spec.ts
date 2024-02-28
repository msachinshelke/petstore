import { test, expect } from '@playwright/test';
import { createUser } from '../../api/user/user';

test.describe("Test User Login and Logout", () => {
  let userName, password, userID

  test.beforeAll(async () => {
    const response = await createUser();
    userID = response.userID;
    userName = response.username;
    password = response.password;
  })

  test("log-in and log-out user", async ({ request }) => {

    // log-in in with a username and password query params
    const response = await request.get('user/login', {
      params: {
        "username": userName,
        "password": password,
      }
    });

    // assert that api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // getting the response and asserting proper message is getting displayed
    const result = await response.json();
    expect(result.message).toContain('logged in user session:');

    // log-out 
    const responseLogOut = await request.get('user/logout');

    // assert that api is working as expected
    expect(responseLogOut.ok()).toBeTruthy();
    expect(responseLogOut.status()).toBe(200);

    // getting the response and asserting proper message is getting displayed
    const resultLogOut = await responseLogOut.json();
    expect(resultLogOut.message).toContain('ok');
  });
});