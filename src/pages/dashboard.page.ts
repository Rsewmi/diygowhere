import { Locator, Page } from '@playwright/test';
import { URLS } from '../common/urls';

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
