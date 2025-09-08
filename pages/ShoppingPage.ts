import { Page, expect } from '@playwright/test';

export class ShoppingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  firstProductCard = () => this.page.locator('.product-card').first();
  addToCartButton = () => this.page.getByRole('button', { name: 'Add to Cart' });
  goToCartButton = () => this.page.getByRole('link', { name: 'Go to cart' });
  cartItem = () => this.page.locator('.line-item');
  checkoutButton = () => this.page.getByRole('link', { name: 'Checkout' });

  // Methods
  async addFirstProductToCart() {
    await this.firstProductCard().click();
    await expect(this.addToCartButton()).toBeVisible();
    await this.addToCartButton().click();
    await expect(this.goToCartButton()).toBeVisible();
  }

  async goToCart() {
    await this.goToCartButton().click();
    await expect(this.page).toHaveURL(/.*cart/);
  }

  async verifyCartDetails() {
    await expect(this.cartItem()).toBeVisible();
    // More assertions can be added here, e.g., verifying price and quantity
  }
}