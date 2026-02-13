import { test, expect } from '../src/fixtures';
import * as utils from '../src/common/utils';

test.describe('Site Builder Tests', () => {
//   test('Create New Blank Site and Verify Header', async ({loggedUser, dashboardPage, newWorkspacePage, editorPage}) => {
//     const siteName = 'Test Site';
//     const style = 'Minimal';
//     const siteHeader = 'Welcome to Test Site';

//     // Create a new blank site
//     await dashboardPage.verifyDashboardPageLoaded();
//     await dashboardPage.createBlankSite();
//     await newWorkspacePage.verifyNewWorkspacePageLoaded();
//     await newWorkspacePage.enterSiteName(siteName);
//     await newWorkspacePage.selectStyle(style);
//     await newWorkspacePage.clickCreateWebsite();

//     // Edit site header in the editor
//     await editorPage.editSiteHeader(siteHeader);

//     // Verify the site header text
//     const headerText = await editorPage.getSiteHeaderText();
//     expect(headerText).toBe(siteHeader);
//   });

  test('Add Component on Canvas', async ({loggedUser, dashboardPage, editorPage}) => {
    const componentName = 'Image';

    // Create a new blank site first to access the editor
    const siteName = 'test govtech';

    await dashboardPage.openSiteDashboard(siteName);
    expect(await editorPage.isEditorPageLoaded()).toBeTruthy();
    expect(await editorPage.getNumberOfComponentsOnCanvas()).toBeGreaterThan(0);

    // Add component to canvas
    const numberOfComponentsBefore = await editorPage.getNumberOfComponentsOnCanvas();
    await editorPage.dragAndDropComponentToCanvas(componentName);
    const numberOfComponentsAfter = await editorPage.getNumberOfComponentsOnCanvas();
    
    // Verify component is added
    expect(numberOfComponentsAfter).toBe(numberOfComponentsBefore + 1);
  });

    test('Edit Component on Canvas', async ({loggedUser, dashboardPage, editorPage}) => {
    const componentName = 'Image';

    // Create a new blank site first to access the editor
    const siteName = 'test govtech';

    await dashboardPage.openSiteDashboard(siteName);
    expect(await editorPage.isEditorPageLoaded()).toBeTruthy();
    expect(await editorPage.isCanvasVisible()).toBeTruthy();

    // Edit site header in the editor
    const newHeaderText = utils.uniqueString("Site Header");
    await editorPage.editSiteHeader(newHeaderText);
    const headerTextAfter = await editorPage.getSiteHeaderText();

    // Verify header is edited
    expect(headerTextAfter).toBe(newHeaderText);
  });

    test('Delete Component on Canvas', async ({loggedUser, dashboardPage, editorPage}) => {
  
    // Create a new blank site first to access the editor
    const siteName = 'test govtech';

    await dashboardPage.openSiteDashboard(siteName);
    expect(await editorPage.isEditorPageLoaded()).toBeTruthy();
    expect(await editorPage.isCanvasVisible()).toBeTruthy();

    // Delete site header in the editor
    const numberOfComponentsBefore = await editorPage.getNumberOfComponentsOnCanvas();
    await editorPage.deleteComponentFromCanvas(2);
    const numberOfComponentsAfter = await editorPage.getNumberOfComponentsOnCanvas();

    // Verify component is deleted
    expect(numberOfComponentsAfter).toBe(numberOfComponentsBefore - 1);
  });
});