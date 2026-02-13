import { Page, Locator } from '@playwright/test';
import { URLS } from '../common/urls';

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

  async dragAndDropComponentToCanvas(componentName: string) {
    const box = await this.canvasLocator.boundingBox();

    if (!box) {
      throw new Error('Canvas not visible');
    }

    await this.sideSectionComponent(componentName).dragTo(
      this.canvasLocator,
      {
        targetPosition: {
          x: box.width / 2,
          y: box.height - 1
        }
      }
    );

    await this.page.waitForTimeout(300);
  }


  async getNumberOfComponentsOnCanvas(): Promise<number> {
    await this.page.waitForTimeout(3000);
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

  async deleteComponentFromCanvas(componentIndex: number) {
    const box = await this.canvasLocator.boundingBox();

    if (!box) {
      throw new Error('Canvas not visible');
    }
    const component = this.componentsOnCanvas.nth(componentIndex);
    await component.scrollIntoViewIfNeeded();
    await component.click({
      position: { x: box.width / 2, y: box.height - 10 }
    });

    await this.componentDeleteButton.click();
  }
}
