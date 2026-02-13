import { Locator, Page } from '@playwright/test';
import { URLS } from '../common/urls';

// Dashboard page abstraction following the Page Object Model (POM) pattern.
// Centralizes selectors and user actions to improve readability,
// reduce duplication, and isolate UI changes from test logic.

export class DashboardPage {

  readonly blankSiteButton : Locator

  constructor(private page: Page) {
    this.blankSiteButton = this.page.locator('text=Blank site');
  }

  private siteDashboardLink(dashboardName: string): Locator {
    return this.page.locator(`p:has-text("${dashboardName}")`);
  }

  async verifyDashboardPageLoaded(): Promise<boolean> {
    return this.page.url().includes(URLS.DASHBOARD_PAGE);
  }   

  async createBlankSite() {
    await this.blankSiteButton.click();
  }

  async openSiteDashboard(dashboardName: string) {
    await this.siteDashboardLink(dashboardName).click();
  }
}
