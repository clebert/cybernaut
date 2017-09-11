/// <reference path="../../types/puppeteer.d.ts" />

import {Page} from 'puppeteer';

export async function clearInputField(
  page: Page,
  selector: string
): Promise<void> {
  await page.$eval<void, HTMLInputElement>(selector, element => {
    element.value = '';
  });
}
