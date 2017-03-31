import {Accessor} from './accessor';
import {Action} from './action';
import {sleep} from './utils';

// tslint:disable-next-line no-any
export type Script = (callback: (result?: any) => void) => void;

export class Browser {
  public get pageTitle(): Accessor<string> {
    return {
      description: {template: 'page title'},
      get: async driver => driver.getTitle()
    };
  }

  public get pageUrl(): Accessor<string> {
    return {
      description: {template: 'page url'},
      get: async driver => driver.getCurrentUrl()
    };
  }

  public get windowX(): Accessor<number> {
    return {
      description: {template: 'window x-position'},
      get: async driver => (await driver.manage().window().getPosition()).x
    };
  }

  public get windowY(): Accessor<number> {
    return {
      description: {template: 'window y-position'},
      get: async driver => (await driver.manage().window().getPosition()).y
    };
  }

  public get windowWidth(): Accessor<number> {
    return {
      description: {template: 'window width'},
      get: async driver => (await driver.manage().window().getSize()).width
    };
  }

  public get windowHeight(): Accessor<number> {
    return {
      description: {template: 'window height'},
      get: async driver => (await driver.manage().window().getSize()).height
    };
  }

  // tslint:disable-next-line no-any
  public scriptResult(scriptName: string, script: Script): Accessor<any> {
    return {
      description: {template: 'result of script {}', args: [scriptName]},
      get: async driver => driver.executeAsyncScript(script)
    };
  }

  public executeScript(scriptName: string, script: Script): Action {
    return {
      description: {template: 'execute script {}', args: [scriptName]},
      perform: async driver => void await driver.executeAsyncScript(script)
    };
  }

  public loadPage(url: string): Action {
    return {
      description: {template: 'load page {}', args: [url]},
      perform: async driver => driver.navigate().to(url)
    };
  }

  public maximizeWindow(): Action {
    return {
      description: {template: 'maximize window'},
      perform: async driver => driver.manage().window().maximize()
    };
  }

  public navigateBack(): Action {
    return {
      description: {template: 'navigate back'},
      perform: async driver => driver.navigate().back()
    };
  }

  public navigateForward(): Action {
    return {
      description: {template: 'navigate forward'},
      perform: async driver => driver.navigate().forward()
    };
  }

  public reloadPage(): Action {
    return {
      description: {template: 'reload page'},
      perform: async driver => driver.navigate().refresh()
    };
  }

  public setWindowPosition(x: number, y: number): Action {
    return {
      description: {template: 'set window position to {},{}', args: [x, y]},
      perform: async driver => driver.manage().window().setPosition(x, y)
    };
  }

  public setWindowSize(width: number, height: number): Action {
    return {
      description: {
        template: 'set window size to {}x{}', args: [width, height]
      },
      perform: async driver => driver.manage().window().setSize(width, height)
    };
  }

  public sleep(duration: number): Action {
    return {
      description: {template: 'sleep for {} ms', args: [duration]},
      perform: async () => sleep(duration)
    };
  }
}
