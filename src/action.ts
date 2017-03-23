import {WebDriver} from 'selenium-webdriver';
import {Description} from './description';

export interface Action {
  readonly description: Description;

  perform(driver: WebDriver): Promise<void>;
}
