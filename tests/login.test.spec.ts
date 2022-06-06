// @ts-check
import { test, expect } from '@playwright/test';
import { assertInvalidCredentialsMessage, logIn, logInUsingValidCredentials } from '../login.utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
});

test.describe('Log in', () => {

  test('when enter valid credentials should redirect to dashboard', async ({ page }) => {
    await logInUsingValidCredentials(page);

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/dashboard');
  });

  test('when enter invalid password and invalid username should display proper error message', async ({ page }) => {
    await logIn(page, 'Abcde', 'xyz');

    await assertInvalidCredentialsMessage(page);
  });
  
  test('when enter invalid password should display proper error message', async ({ page }) => {
    await logIn(page, 'Admin', 'xyz');

    await assertInvalidCredentialsMessage(page);
  });
  
  test('when enter invalid username should display proper error message', async ({ page }) => {
    await logIn(page, 'Abcde', 'admin123');

    await assertInvalidCredentialsMessage(page);
  });
});
