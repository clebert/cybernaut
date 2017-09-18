/// <reference path="../types/puppeteer.d.ts" />

import tempWrite = require('temp-write');

import {Page} from 'puppeteer';

function isOnCI(): boolean {
  return process.env.CI === 'true';
}

export async function takeScreenshot(page: Page): Promise<string> {
  const screenshot = await page.screenshot({type: 'png'});

  return isOnCI()
    ? screenshot.toString('base64')
    : tempWrite(screenshot, 'screenshot.png');
}
