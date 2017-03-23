import {WebDriver} from 'selenium-webdriver';
import {Description} from './description';

export interface Accessor<T> {
  readonly description: Description;

  get(driver: WebDriver): Promise<T>;
}
