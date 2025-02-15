import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';

const ARTICLE_TITLE = 'automation';
const ARTICLE_TEXT =
  'The term automation, inspired by the earlier word automatic (coming from automaton), was not widely used before 1947, when Ford established an automation department.';
const EXPECTED_SCREENSHOT = 'wikipedia-screenshot-expected.png';

test('Google: search', async ({ pages }) => {
  await pages.googlePage.open();
  await pages.googlePage.search(ARTICLE_TITLE);
  //It is impossible to continue testing further because Google is protected from automation interrupts with a CAPTCHA
});

test('Wikipedia: search for article', async ({ pages }) => {
  await pages.wikipediaPage.openMainPage();
  await pages.wikipediaPage.searchForArticle(ARTICLE_TITLE);
});

test('Wikipedia: search text in article', async ({ pages }) => {
  await pages.wikipediaPage.openSpecificArticle(ARTICLE_TITLE);
  await pages.wikipediaPage.assertArticleContainsText(ARTICLE_TEXT);
});

test("Wikipedia: assert page content hasn't been changed by screenshoot", async ({ page, pages }) => {
  await pages.wikipediaPage.openSpecificArticle(ARTICLE_TITLE);
  await pages.wikipediaPage.assertArticleContainsText(ARTICLE_TEXT);

  const actualScreenshot = await page.screenshot();
expect(actualScreenshot).toMatchSnapshot({
  name: EXPECTED_SCREENSHOT,
  maxDiffPixelRatio: 0.12,
});
});
