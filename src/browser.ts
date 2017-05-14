import {Accessor} from './accessor';
import {Action} from './action';
import {sleep} from './utils';

// tslint:disable-next-line no-any
export type Script = (callback: (result?: any) => void) => void;

export class Browser {
  public get pageTitle(): Accessor<string> {
    return {
      name: 'the title of the page',
      get: async driver => driver.getTitle()
    };
  }

  public get pageUrl(): Accessor<string> {
    return {
      name: 'the URL of the page',
      get: async driver => driver.getCurrentUrl()
    };
  }

  public get windowXPosition(): Accessor<number> {
    return {
      name: 'the X position of the window',
      get: async driver => (await driver.manage().window().getPosition()).x
    };
  }

  public get windowYPosition(): Accessor<number> {
    return {
      name: 'the Y position of the window',
      get: async driver => (await driver.manage().window().getPosition()).y
    };
  }

  public get windowWidth(): Accessor<number> {
    return {
      name: 'the width of the window',
      get: async driver => (await driver.manage().window().getSize()).width
    };
  }

  public get windowHeight(): Accessor<number> {
    return {
      name: 'the height of the window',
      get: async driver => (await driver.manage().window().getSize()).height
    };
  }

  // tslint:disable-next-line no-any
  public scriptResult(scriptName: string, script: Script): Accessor<any> {
    return {
      name: `the result of the ${scriptName} script`,
      get: async driver => driver.executeAsyncScript(script)
    };
  }

  public executeScript(scriptName: string, script: Script): Action {
    return {
      description: `Execute the ${scriptName} script`,
      perform: async driver => void await driver.executeAsyncScript(script)
    };
  }

  public loadPage(url: string): Action {
    return {
      description: 'Load the page ' + url,
      perform: async driver => driver.navigate().to(url)
    };
  }

  public maximizeWindow(): Action {
    return {
      description: 'Maximize the window',
      perform: async driver => driver.manage().window().maximize()
    };
  }

  public navigateBack(): Action {
    return {
      description: 'Navigate back',
      perform: async driver => driver.navigate().back()
    };
  }

  public navigateForward(): Action {
    return {
      description: 'Navigate forward',
      perform: async driver => driver.navigate().forward()
    };
  }

  public reloadPage(): Action {
    return {
      description: 'Reload the page',
      perform: async driver => driver.navigate().refresh()
    };
  }

  public setWindowPosition(x: number, y: number): Action {
    return {
      description: `Set the window position to ${x},${y}`,
      perform: async driver => driver.manage().window().setPosition(x, y)
    };
  }

  public setWindowSize(width: number, height: number): Action {
    return {
      description: `Set the window size to ${width}x${height}`,
      perform: async driver => driver.manage().window().setSize(width, height)
    };
  }

  public sleep(durationInMillis: number, reason?: string): Action {
    const description =
      `Sleep for ${durationInMillis} ms${reason ? ` because ${reason}` : ''}`;

    return {description, perform: async () => sleep(durationInMillis)};
  }
}
