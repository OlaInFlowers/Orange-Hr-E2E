import { expect } from "@playwright/test";

const logIn = async (page, username, password) => {
  // Fill an input[id="txtUsername"]
  await page.locator('id=txtUsername').fill(username);
  // Fill an input[id="txtPassword"]
  await page.locator('id=txtPassword').fill(password);
  // Fill an input [id="btnLogin"]
  await page.locator('id=btnLogin').click();
}

const logInUsingValidCredentials = async (page) => {    
  await logIn(page, 'Admin', 'admin123');
}

const assertInvalidCredentialsMessage = async (page) => {
  const errorMessageContainer = page.locator('id=spanMessage'); 
  const errorMessage = await errorMessageContainer.innerHTML();
  expect(errorMessage).toBe("Invalid credentials");
}

export {
  logIn,  
  logInUsingValidCredentials,
  assertInvalidCredentialsMessage
};