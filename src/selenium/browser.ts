import {By} from 'selenium-webdriver';
import {SeleniumAccessor} from './accessor';
import {SeleniumAction} from './action';

export type AccessorScript<T> = (callback: (result: T) => void) => void;
export type ActionScript = (callback: () => void) => void;

export class SeleniumBrowser {
  public get pageTitle(): SeleniumAccessor<string> {
    return {
      description: 'The title of the page',
      get: async driver => driver.getTitle()
    };
  }

  public get pageUrl(): SeleniumAccessor<string> {
    return {
      description: 'The URL of the page',
      get: async driver => driver.getCurrentUrl()
    };
  }

  public get windowXPosition(): SeleniumAccessor<number> {
    return {
      description: 'The X position of the window',
      get: async driver => (await driver.manage().window().getPosition()).x
    };
  }

  public get windowYPosition(): SeleniumAccessor<number> {
    return {
      description: 'The Y position of the window',
      get: async driver => (await driver.manage().window().getPosition()).y
    };
  }

  public get windowWidth(): SeleniumAccessor<number> {
    return {
      description: 'The width of the window',
      get: async driver => (await driver.manage().window().getSize()).width
    };
  }

  public get windowHeight(): SeleniumAccessor<number> {
    return {
      description: 'The height of the window',
      get: async driver => (await driver.manage().window().getSize()).height
    };
  }

  public elementCount(selector: string): SeleniumAccessor<number> {
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

  public scriptResult<T>(
    scriptName: string,
    script: AccessorScript<T>
  ): SeleniumAccessor<T> {
    return {
      description: `The result of the ${scriptName} script`,
      get: async driver => driver.executeAsyncScript(script)
    };
  }

  public executeScript(
    scriptName: string,
    script: ActionScript
  ): SeleniumAction {
    return {
      description: `Execute the ${scriptName} script`,
      perform: async driver => void await driver.executeAsyncScript(script)
    };
  }

  public loadPage(url: string): SeleniumAction {
    return {
      description: 'Load the page at ' + url,
      perform: async driver => driver.navigate().to(url)
    };
  }

  public navigateBack(): SeleniumAction {
    return {
      description: 'Navigate back',
      perform: async driver => driver.navigate().back()
    };
  }

  public navigateForward(): SeleniumAction {
    return {
      description: 'Navigate forward',
      perform: async driver => driver.navigate().forward()
    };
  }

  public reloadPage(): SeleniumAction {
    return {
      description: 'Reload the page',
      perform: async driver => driver.navigate().refresh()
    };
  }

  public setWindowPosition(x: number, y: number): SeleniumAction {
    return {
      description: `Set the window position to ${x},${y}`,
      perform: async driver => driver.manage().window().setPosition(x, y)
    };
  }

  public setWindowSize(width: number, height: number): SeleniumAction {
    return {
      description: `Set the window size to ${width}x${height}`,
      perform: async driver => driver.manage().window().setSize(width, height)
    };
  }
}
