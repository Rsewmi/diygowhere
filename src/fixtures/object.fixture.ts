import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { NewWorkspacePage } from '../pages/workspace.page';
import { EditorPage } from '../pages/editor.page';

type ObjectFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  newWorkspacePage: NewWorkspacePage;
  editorPage: EditorPage;
};

export const objectTest = base.extend<ObjectFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  newWorkspacePage: async ({ page }, use) => {
    const newWorkspacePage = new NewWorkspacePage(page);
    await use(newWorkspacePage);
  },
  editorPage: async ({ page }, use) => {
    const editorPage = new EditorPage(page);
    await use(editorPage);
  },
});

export { expect } from '@playwright/test';