import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  userIcon = () => this.page.getByLabel('User account');
  loginLink = () => this.page.getByRole('link', { name: 'Login' });
  emailInput = () => this.page.getByLabel('Email', { exact: true });
  passwordInput = () => this.page.getByLabel('Password', { exact: true });
  loginButton = () => this.page.getByRole('button', { name: 'Log In' });
  logoutLink = () => this.page.getByRole('link', { name: 'Log Out' });

  // Methods
  async navigateToLoginPage() {
    await this.userIcon().click();
    await this.loginLink().click();
    await expect(this.page).toHaveURL(/.*login/);
  }

  async login(email, password) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async logout() {
    await this.userIcon().click();
    await this.logoutLink().click();
    await expect(this.page.getByText('Logged out successfully.')).toBeVisible();
  }
}