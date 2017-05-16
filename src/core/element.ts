import {By} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';
import {serialize} from './utils';

export class Element {
  private readonly _name: string;
  private readonly _selector: string;

  public constructor(name: string, selector: string) {
    this._name = name;
    this._selector = selector;
  }

  public get tagName(): Accessor<string> {
    return {
      name: `The tag name of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<string> {
    return {
      name: `The text of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getText();
      }
    };
  }

  public get existence(): Accessor<boolean> {
    return {
      name: `The existence of the ${this._name} element`,
      get: async driver => {
        const elements = await driver.findElements(By.css(this._selector));

        return elements.length > 0;
      }
    };
  }

  public get visibility(): Accessor<boolean> {
    return {
      name: `The visibility of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.isDisplayed();
      }
    };
  }

  public get xPosition(): Accessor<number> {
    return {
      name: `The X position of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getLocation()).x;
      }
    };
  }

  public get yPosition(): Accessor<number> {
    return {
      name: `The Y position of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<number> {
    return {
      name: `The width of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<number> {
    return {
      name: `The height of the ${this._name} element`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getSize()).height;
      }
    };
  }

  public attributeValue(attributeName: string): Accessor<string | null> {
    const name =
      `The value of the ${attributeName} attribute ` +
      `of the ${this._name} element`;

    return {
      name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getAttribute(attributeName);
      }
    };
  }

  public cssValue(cssName: string): Accessor<string> {
    const name =
      `The value of the ${cssName} css of the ${this._name} element`;

    return {
      name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getCssValue(cssName);
      }
    };
  }

  public clearValue(): Action {
    return {
      description: `Clear the value of the ${this._name} element`,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.clear();
      }
    };
  }

  public click(): Action {
    return {
      description: `Click on the ${this._name} element`,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.click();
      }
    };
  }

  public sendKeys(...keys: string[]): Action {
    if (keys.length === 0) {
      throw new Error('At least one key must be specified');
    }

    const serializedKeys = keys.map(serialize).join(', ');

    const description =
      `Send the key${keys.length > 1 ? 's' : ''} ` +
      `${serializedKeys} to the ${this._name} element`;

    return {
      description,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.sendKeys(...keys);
      }
    };
  }

  public submitForm(): Action {
    return {
      description: `Submit the form containing the ${this._name} element`,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.submit();
      }
    };
  }
}
