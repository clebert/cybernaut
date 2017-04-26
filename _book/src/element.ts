import {By} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';
import {translate} from './utils';

export class Element {
  private readonly _name: string;
  private readonly _selector: string;

  public constructor(selector: string, name: string = 'element') {
    this._name = name;
    this._selector = selector;
  }

  public get tagName(): Accessor<string> {
    return {
      description: {
        template: `tag name of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<string> {
    return {
      description: {
        template: `text of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getText();
      }
    };
  }

  public get visibility(): Accessor<boolean> {
    return {
      description: {
        template: `visibility of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.isDisplayed();
      }
    };
  }

  public get x(): Accessor<number> {
    return {
      description: {
        template: `x-position of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getLocation()).x;
      }
    };
  }

  public get y(): Accessor<number> {
    return {
      description: {
        template: `y-position of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<number> {
    return {
      description: {
        template: `width of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<number> {
    return {
      description: {
        template: `height of ${this._name} {}`, args: [this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getSize()).height;
      }
    };
  }

  public cssValue(cssName: string): Accessor<string> {
    return {
      description: {
        template: `css value {} of ${this._name} {}`,
        args: [cssName, this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getCssValue(cssName);
      }
    };
  }

  public propertyValue(propertyName: string): Accessor<string | null> {
    return {
      description: {
        template: `property value {} of ${this._name} {}`,
        args: [propertyName, this._selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getAttribute(propertyName);
      }
    };
  }

  public clearValue(): Action {
    return {
      description: {
        template: `clear value of ${this._name} {}`, args: [this._selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.clear();
      }
    };
  }

  public click(): Action {
    return {
      description: {
        template: `click on ${this._name} {}`, args: [this._selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.click();
      }
    };
  }

  public sendKeys(...keys: string[]): Action {
    return {
      description: {
        template: `send keys {} to ${this._name} {}`,
        args: [keys.map(translate), this._selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.sendKeys(...keys);
      }
    };
  }

  public submitForm(): Action {
    return {
      description: {
        template: `submit form containing ${this._name} {}`,
        args: [this._selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.submit();
      }
    };
  }
}
