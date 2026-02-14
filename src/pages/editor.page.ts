import { Page, Locator } from '@playwright/test';
import { URLS } from '../common/urls';

// Editor page abstraction following the Page Object Model (POM) pattern.
// Provides reusable methods for interacting with the editor canvas,
// components, and site content, improving maintainability and test clarity.

export class EditorPage {

  readonly canvasLocator : Locator;
  readonly componentsOnCanvas : Locator;
  readonly defaultHeader : Locator;
  readonly componentDeleteButton : Locator;

  constructor(private page: Page) {
    this.canvasLocator = this.page.locator('#body-ROOT');
    this.componentsOnCanvas= this.page.locator('section.sc-gMFoeA');
    this.defaultHeader = this.page.locator('#heading-uqFbz4OZtw p strong');
    this.componentDeleteButton = this.page.locator('button[aria-label="Delete"]');
  }
  private sideSectionComponent(componentName: string): Locator {
    return this.page.locator(`button[title="${componentName}"]`);
  }

  async isEditorPageLoaded(): Promise<boolean> {
    return this.page.url().includes(URLS.EDITOR_PAGE);
  }

  // Drags a component from the side section onto the editor canvas.
  async dragAndDropComponentToCanvas(componentName: string) {
    // Get bounding box of the canvas to determine drop position.
    const box = await this.canvasLocator.boundingBox();

    if (!box) {
      throw new Error('Canvas not visible');
    }

    // Perform drag-and-drop action. Added targetPosition to drop at bottom center of canvas.
    await this.sideSectionComponent(componentName).dragTo(
      this.canvasLocator,
      {
        targetPosition: {
          x: box.width / 2,
          y: box.height - 1
        }
      }
    );
    // Wait briefly to allow the component to be added to the canvas before proceeding.
    await this.page.waitForTimeout(300);
  }

  async getNumberOfComponentsOnCanvas(): Promise<number> {
    return await this.componentsOnCanvas.count();
  }

  async editSiteHeader(siteHeader: string) {
    await this.defaultHeader.click();
    await this.defaultHeader.fill(siteHeader);
    await this.canvasLocator.click();
  } 

  async getSiteHeaderText(): Promise<string> {
    return await this.defaultHeader.textContent() || '';
  }

  // Deletes a component from the canvas based on its index.
  async deleteComponentFromCanvas(componentIndex: number) {
    const component = this.componentsOnCanvas.nth(componentIndex);
    await component.scrollIntoViewIfNeeded();
    // Click at position (1,1) to avoid overlapping the delete button with other UI elements.
    await component.click({
      position: { x: 1, y: 1 }
    });

    await this.componentDeleteButton.click();
  }

  async isCanvasVisible(): Promise<boolean> {
    return await this.canvasLocator.isVisible();
  }
}
