import { expect, request } from "@playwright/test";
import { user } from "../../models/user/user";

export async function createUser() {
    const apiRequest = await request.newContext();
    // creating a post request with random user data
    const response = await apiRequest.post('user', {
        data: user,
    });

    // getting the response and fetching user id
    const result = await response.json();
    const userID = result.message;

    // assert that api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const { username, password } = user;

    return { userID, username, password };
}

export async function login(userName, password) {
    const apiRequest = await request.newContext();

    // log-in in with a username and password query params
    const responseLogin = await apiRequest.get('user/login', {
        params: {
            "username": userName,
            "password": password,
        }
    });

    expect(responseLogin.ok()).toBeTruthy();
    expect(responseLogin.status()).toBe(200);
}

export async function deleteUser(userName: string) {
    const apiRequest = await request.newContext();

    const responseDelete = await apiRequest.delete(`user/${userName}`);

    // assert that api is working as expected
    expect(responseDelete.ok()).toBeTruthy();
    expect(responseDelete.status()).toBe(200);

    // assert that correct data is getting returned 
    const responseData = await responseDelete.json();
    expect(responseData.message).toContain(userName);
}