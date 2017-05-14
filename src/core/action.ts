import {WebDriver} from 'selenium-webdriver';

export interface Action {
  readonly description: string;

  perform(driver: WebDriver): Promise<void>;
}
