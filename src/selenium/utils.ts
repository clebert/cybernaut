import {SeleniumConfig} from './config';

export function isChrome(config: SeleniumConfig): boolean {
  return config.capabilities.browserName === 'chrome';
}

export function isFirefox(config: SeleniumConfig): boolean {
  return config.capabilities.browserName === 'firefox';
}
