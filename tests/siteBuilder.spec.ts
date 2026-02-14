import { test, expect } from '../src/fixtures';
import * as utils from '../src/common/utils';
import { SITE_CONFIG } from '../src/common/constans';

test.describe('Site Builder Tests', () => {

  test('Add Component on Canvas', async ({loggedUser, dashboardPage, editorPage}) => {
  
    // Create a new blank site first to access the editor
    const siteName = 'test govtech';

    await dashboardPage.openSiteDashboard(siteName);
    expect(await editorPage.isEditorPageLoaded()).toBeTruthy();
    expect(await editorPage.isCanvasVisible()).toBeTruthy();

    // Add component to canvas
    const numberOfComponentsBefore = await editorPage.getNumberOfComponentsOnCanvas();
    await editorPage.dragAndDropComponentToCanvas(SITE_CONFIG.COMPONENTS.IMAGE);
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
    // Assuming the header is at index 0, we will delete the component at index 2 which is the image component 
    // added in previous test or any component added by default when creading the site.
    await editorPage.deleteComponentFromCanvas(2);
    const numberOfComponentsAfter = await editorPage.getNumberOfComponentsOnCanvas();

    // Verify component is deleted
    expect(numberOfComponentsAfter).toBe(numberOfComponentsBefore - 1);
  });
});