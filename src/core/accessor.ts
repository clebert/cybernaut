import {WebDriver} from 'selenium-webdriver';

export interface Accessor<T> {
  readonly name: string;

  get(driver: WebDriver): Promise<T>;
}
