/// <reference path="../../types/puppeteer.d.ts" />

import {Page} from 'puppeteer';
import {clearInputField} from './clearInputField';

export async function typeIntoInputField(
  page: Page,
  selector: string,
  text: string
): Promise<void> {
  await clearInputField(page, selector);
  await page.focus(selector);
  await page.type(text, {delay: 100});
}
