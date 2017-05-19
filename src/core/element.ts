import {By, Key, WebDriver, WebElement} from 'selenium-webdriver';
import {format} from '../utils/format';
import {Accessor} from './accessor';
import {Action} from './action';

const KeyName = Object.create(null);

for (const keyName of Object.keys(Key).sort() as (keyof Key)[]) {
  KeyName[Key[keyName]] = keyName;
}

function serialize(char: string): string {
  return KeyName[char] ? 'Key.' + String(KeyName[char]) : `'${char}'`;
}

export class Element {
  private readonly _index: number;
  private readonly _name: string;
  private readonly _selector: string;

  public constructor(name: string, selector: string, index: number) {
    this._index = index;
    this._name = name;
    this._selector = selector;
  }

  public get tagName(): Accessor<string> {
    return {
      name: `The tag name of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<string> {
    return {
      name: `The text of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getText();
      }
    };
  }

  public get existence(): Accessor<boolean> {
    return {
      name: `The existence of the ${this._name} element`,
      get: async driver => {
        const elements = await this._findElements(driver);

        return Boolean(elements[this._index]);
      }
    };
  }

  public get visibility(): Accessor<boolean> {
    return {
      name: `The visibility of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.isDisplayed();
      }
    };
  }

  public get xPosition(): Accessor<number> {
    return {
      name: `The X position of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getLocation()).x;
      }
    };
  }

  public get yPosition(): Accessor<number> {
    return {
      name: `The Y position of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<number> {
    return {
      name: `The width of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<number> {
    return {
      name: `The height of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

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
        const element = await this._findElement(driver);

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
        const element = await this._findElement(driver);

        return element.getCssValue(cssName);
      }
    };
  }

  public clearValue(): Action {
    return {
      description: `Clear the value of the ${this._name} element`,
      perform: async driver => {
        const element = await this._findElement(driver);

        await element.clear();
      }
    };
  }

  public click(): Action {
    return {
      description: `Click on the ${this._name} element`,
      perform: async driver => {
        const element = await this._findElement(driver);

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
        const element = await this._findElement(driver);

        await element.sendKeys(...keys);
      }
    };
  }

  public submitForm(): Action {
    return {
      description: `Submit the form containing the ${this._name} element`,
      perform: async driver => {
        const element = await this._findElement(driver);

        await element.submit();
      }
    };
  }

  public toString(): string {
    return format({
      name: this._name, selector: this._selector, index: this._index
    });
  }

  private async _findElement(driver: WebDriver): Promise<WebElement> {
    const elements = await this._findElements(driver);
    const element = elements[this._index];

    if (!element) {
      throw new Error('Unable to locate element: ' + this);
    }

    return element;
  }

  private async _findElements(driver: WebDriver): Promise<WebElement[]> {
    return driver.findElements(By.css(this._selector));
  }
}
