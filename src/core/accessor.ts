import {WebDriver} from 'selenium-webdriver';

export interface Accessor<T> {
  readonly description: string;

  get(driver: WebDriver): Promise<T>;
}
