import {By, WebDriver} from 'selenium-webdriver';
import {Accessor} from './core/accessor';
import {Action} from './core/action';

export type AccessorScript<T> = (callback: (result: T) => void) => void;
export type ActionScript = (callback: () => void) => void;

export class Browser {
  public get pageTitle(): Accessor<WebDriver, string> {
    return {
      description: 'The title of the page',
      get: async driver => driver.getTitle()
    };
  }

  public get pageUrl(): Accessor<WebDriver, string> {
    return {
      description: 'The URL of the page',
      get: async driver => driver.getCurrentUrl()
    };
  }

  public get windowXPosition(): Accessor<WebDriver, number> {
    return {
      description: 'The X position of the window',
      get: async driver => (await driver.manage().window().getPosition()).x
    };
  }

  public get windowYPosition(): Accessor<WebDriver, number> {
    return {
      description: 'The Y position of the window',
      get: async driver => (await driver.manage().window().getPosition()).y
    };
  }

  public get windowWidth(): Accessor<WebDriver, number> {
    return {
      description: 'The width of the window',
      get: async driver => (await driver.manage().window().getSize()).width
    };
  }

  public get windowHeight(): Accessor<WebDriver, number> {
    return {
      description: 'The height of the window',
      get: async driver => (await driver.manage().window().getSize()).height
    };
  }

  public elementCount(selector: string): Accessor<WebDriver, number> {
    const description =
      `The count of matching elements for the specified selector (${selector})`;

    return {
      description,
      get: async driver => {
        const elements = await driver.findElements(By.css(selector));

        return elements.length;
      }
    };
  }

  public scriptResult<T>(
    scriptName: string, script: AccessorScript<T>
  ): Accessor<WebDriver, T> {
    return {
      description: `The result of the ${scriptName} script`,
      get: async driver => driver.executeAsyncScript(script)
    };
  }

  public executeScript(
    scriptName: string, script: ActionScript
  ): Action<WebDriver> {
    return {
      description: `Execute the ${scriptName} script`,
      perform: async driver => void await driver.executeAsyncScript(script)
    };
  }

  public loadPage(url: string): Action<WebDriver> {
    return {
      description: 'Load the page at ' + url,
      perform: async driver => driver.navigate().to(url)
    };
  }

  public navigateBack(): Action<WebDriver> {
    return {
      description: 'Navigate back',
      perform: async driver => driver.navigate().back()
    };
  }

  public navigateForward(): Action<WebDriver> {
    return {
      description: 'Navigate forward',
      perform: async driver => driver.navigate().forward()
    };
  }

  public reloadPage(): Action<WebDriver> {
    return {
      description: 'Reload the page',
      perform: async driver => driver.navigate().refresh()
    };
  }

  public setWindowPosition(x: number, y: number): Action<WebDriver> {
    return {
      description: `Set the window position to ${x},${y}`,
      perform: async driver => driver.manage().window().setPosition(x, y)
    };
  }

  public setWindowSize(width: number, height: number): Action<WebDriver> {
    return {
      description: `Set the window size to ${width}x${height}`,
      perform: async driver => driver.manage().window().setSize(width, height)
    };
  }
}
