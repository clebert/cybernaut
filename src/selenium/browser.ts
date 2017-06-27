import {By} from 'selenium-webdriver';
import {SeleniumAccessor} from './accessor';
import {SeleniumAction} from './action';
import {SeleniumElement} from './element';

export function defineElement(
  name: string,
  selector: string,
  index: number = 0
): SeleniumElement {
  return new SeleniumElement([{index, name, selector}]);
}

export function elementCount(selector: string): SeleniumAccessor<number> {
  const description =
    'The count of matching elements ' +
    `for the specified selector (${selector})`;

  return {
    description,
    get: async driver => {
      const elements = await driver.findElements(By.css(selector));

      return elements.length;
    }
  };
}

export type ActionScript = (callback: () => void) => void;

export function executeScript(
  scriptName: string,
  script: ActionScript
): SeleniumAction {
  return {
    description: `Execute the ${scriptName} script`,
    perform: async driver => void await driver.executeAsyncScript(script)
  };
}

export function loadPage(url: string): SeleniumAction {
  return {
    description: 'Load the page at ' + url,
    perform: async driver => driver.navigate().to(url)
  };
}

export function navigateBack(): SeleniumAction {
  return {
    description: 'Navigate back',
    perform: async driver => driver.navigate().back()
  };
}

export function navigateForward(): SeleniumAction {
  return {
    description: 'Navigate forward',
    perform: async driver => driver.navigate().forward()
  };
}

export const pageTitle: SeleniumAccessor<string> = {
  description: 'The title of the page',
  get: async driver => driver.getTitle()
};

export const pageUrl: SeleniumAccessor<string> = {
  description: 'The URL of the page',
  get: async driver => driver.getCurrentUrl()
};

export function reloadPage(): SeleniumAction {
  return {
    description: 'Reload the page',
    perform: async driver => driver.navigate().refresh()
  };
}

export type AccessorScript<T> = (callback: (result: T) => void) => void;

export function scriptResult<T>(
  scriptName: string,
  script: AccessorScript<T>
): SeleniumAccessor<T> {
  return {
    description: `The result of the ${scriptName} script`,
    get: async driver => driver.executeAsyncScript<T>(script)
  };
}

export function setWindowPosition(x: number, y: number): SeleniumAction {
  return {
    description: `Set the window position to ${x},${y}`,
    perform: async driver => driver.manage().window().setPosition(x, y)
  };
}

export function setWindowSize(width: number, height: number): SeleniumAction {
  return {
    description: `Set the window size to ${width}x${height}`,
    perform: async driver => driver.manage().window().setSize(width, height)
  };
}

export const windowHeight: SeleniumAccessor<number> = {
  description: 'The height of the window',
  get: async driver => (await driver.manage().window().getSize()).height
};

export const windowWidth: SeleniumAccessor<number> = {
  description: 'The width of the window',
  get: async driver => (await driver.manage().window().getSize()).width
};

export const windowXPosition: SeleniumAccessor<number> = {
  description: 'The X position of the window',
  get: async driver => (await driver.manage().window().getPosition()).x
};

export const windowYPosition: SeleniumAccessor<number> = {
  description: 'The Y position of the window',
  get: async driver => (await driver.manage().window().getPosition()).y
};
