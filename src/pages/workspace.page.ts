import { Page, Locator } from '@playwright/test';
import { URLS } from '../common/urls';

// Page Object Model for the New Workspace creation page.
// Encapsulates workspace setup actions such as naming,
// style selection, and workspace creation.

export class NewWorkspacePage {

  readonly sitenameInput: Locator;
  readonly createWebsiteButton: Locator;
  readonly styleContainer : Locator;
  readonly styleOption : Locator;

  constructor(private page: Page) {
    this.sitenameInput = this.page.locator('input[name="workspaceName"]');
    this.createWebsiteButton = this.page.locator('button:has-text("Create workspace")');
    this.styleContainer = this.page.locator('label.sc-efBUvZ');
    this.styleOption = this.styleContainer.locator('p.sc-fHjqPf');
  }

  async verifyNewWorkspacePageLoaded(): Promise<boolean> {
    return this.page.url().includes(URLS.WORKSPACE_PAGE);
  }

  async enterSiteName(name: string) {
    await this.sitenameInput.fill(name);
  }

  async clickCreateWebsite() {
    await this.createWebsiteButton.click();
  }

  async selectStyle(style: string) {
    await this.styleContainer
    .locator(this.styleOption)
    .filter({ hasText: style })
    .click();
  } 
}