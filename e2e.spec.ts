import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShoppingPage } from '../pages/ShoppingPage';

test.describe('E-commerce User Flow', () => {
  let loginPage: LoginPage;
  let shoppingPage: ShoppingPage;

  // You can create a new user for each run or create one once and store the state
  const user = {
    email: testuser-${Date.now()}@example.com,
    password: 'Password123!',
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    shoppingPage = new ShoppingPage(page);
    await page.goto('https://demo.spreecommerce.org/');
  });

  test('should allow a user to sign up, log in, browse, and checkout', async ({ page }) => {
    // 1. Sign Up & Log In
    await loginPage.navigateToLoginPage();
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await page.getByLabel('Email', { exact: true }).fill(user.email);
    await page.getByLabel('Password', { exact: true }).fill(user.password);
    await page.getByLabel('Password Confirmation', { exact: true }).fill(user.password);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await loginPage.navigateToLoginPage();
    await loginPage.login(user.email, user.password);
    await expect(page.getByText('Logged in successfully.')).toBeVisible();

    // 2. Shopping Flow
    await shoppingPage.addFirstProductToCart();

    // 3. Cart & Checkout
    await shoppingPage.goToCart();
    await shoppingPage.verifyCartDetails();
    await shoppingPage.checkoutButton().click();

    // Add checkout steps here
    // ...
    // Verify order confirmation
    // ...
  });
});