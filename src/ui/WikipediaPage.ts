import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export default class WikipediaPage extends BasePage {
  readonly pageUrl: string = 'https://en.wikipedia.org/';

  readonly mainPageTitle: Locator = this.page.locator("[id='Welcome_to_Wikipedia']");
  readonly articleTitle: Locator = this.page.locator("[id='firstHeading'] .mw-page-title-main");
  readonly pageContent: Locator = this.page.locator("[id = 'bodyContent']");
  readonly searchInput: Locator = this.page.locator("[id='searchform'] [type='search']");
  readonly searchButton: Locator = this.page.locator("[id='searchform'] button");

  async openMainPage() {
    await this.page.goto(this.pageUrl);
    await this.assertMainPageIsOpened();
  }

  async assertMainPageIsOpened() {
    await expect(this.mainPageTitle, 'Main Wikipedia page is not opened').toBeVisible();
  }

  async searchForArticle(articleTitle: string) {
    await this.searchInput.fill(articleTitle);
    await this.searchButton.click();
    await this.assertArticleIsOpened(articleTitle);
  }

  async openSpecificArticle(articleTitle: string) {
    await this.page.goto(`${this.pageUrl}/wiki/${articleTitle}`);
    await this.assertArticleIsOpened(articleTitle);
  }

  async assertArticleIsOpened(articleTitle: string) {
    await expect(this.articleTitle, `Article with title ${articleTitle} is not opened`).toHaveText(
      new RegExp(articleTitle, 'i')
    );
  }

  async assertArticleContainsText(text: string) {
    await expect(this.pageContent, `The article doesn't contain given part of text: '${text}'`).toContainText(text);
  }
}
