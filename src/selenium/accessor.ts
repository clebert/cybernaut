import {WebDriver} from 'selenium-webdriver';
import {Accessor} from '../core/accessor';

export type SeleniumAccessor<T> = Accessor<WebDriver, T>;
