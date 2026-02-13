import { Page, Locator } from '@playwright/test';
import { URLS } from '../common/urls';

export class LoginPage {

  readonly emailInput: Locator;
  readonly loginButton: Locator;  
  readonly secondaryLoginButton: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator('input[placeholder="Email"]');
    this.loginButton = this.page.locator('.text-white:has-text("Login")');
    this.secondaryLoginButton = this.page.locator('.sc-gniJtd:has-text("Login")');
  }

  async goto() {
    await this.page.goto(URLS.LOGIN_PAGE);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  } 

  async clickSecondaryLoginButton() {
    await this.secondaryLoginButton.click();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

}
