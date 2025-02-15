import { test as base } from '@playwright/test';
import { Pages } from '../../src/ui/Pages';
import { PetstoreRestClient } from '../../src/api/PetstoreRestClient';

export const test = base.extend<{
  pages: Pages;
  client: PetstoreRestClient;
}>({
  pages: async ({ page }, use) => {
    const pages = new Pages(page);
    await use(pages);
  },

  client: async ({}, use) => {
    const client = new PetstoreRestClient();
    await use(client);
  },
});

export { expect } from '@playwright/test';
