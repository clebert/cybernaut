import {WebDriver} from 'selenium-webdriver';
import {TestContext} from '../core/test-context';

export type SeleniumTestContext = TestContext<WebDriver>;
