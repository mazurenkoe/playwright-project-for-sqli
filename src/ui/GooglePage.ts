import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class GooglePage extends BasePage {
  readonly pageUrl: string = 'https://www.google.com/?gl=us&hl=en';

  readonly aceptAllCooliesButton: Locator = this.page.getByRole('button', { name: 'Accept all' });
  readonly searchInput: Locator = this.page.locator("[aria-label='Search']");
  readonly googleLogo: Locator = this.page.locator('.inner-container .google-logo');

  async open() {
    await this.page.goto(this.pageUrl);
    await this.acceptCookiesIfPresent();
    await this.assertIsOpened();
  }

  async assertIsOpened() {
    await expect(this.googleLogo, 'Google page is not opened').toBeAttached();
  }

  async acceptCookiesIfPresent() {
    if ((await this.aceptAllCooliesButton.count()) > 0) {
      await this.aceptAllCooliesButton.scrollIntoViewIfNeeded();
      await this.aceptAllCooliesButton.click();
    }
  }

  async search(textToSearch: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(textToSearch);
    await this.page.keyboard.press('Enter');
  }
}
