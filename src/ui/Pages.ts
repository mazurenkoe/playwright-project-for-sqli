import { Page } from '@playwright/test';
import WikipediaPage from './WikipediaPage';
import GooglePage from './GooglePage';

export class Pages {
  readonly page: Page;
  readonly googlePage: GooglePage;
  readonly wikipediaPage: WikipediaPage;

  constructor(page: Page) {
    this.page = page;
    this.googlePage = new GooglePage(this.page);
    this.wikipediaPage = new WikipediaPage(this.page);
  }
}
