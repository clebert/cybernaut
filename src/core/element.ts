import {By, Key, WebDriver, WebElement} from 'selenium-webdriver';
import {format} from '../utils/format';
import {Accessor} from './accessor';
import {Action} from './action';

const KeyName = Object.create(null);

for (const keyName of Object.keys(Key).sort() as (keyof Key)[]) {
  KeyName[Key[keyName]] = keyName;
}

function serialize(char: string): string {
  return KeyName[char] ? 'Key.' + String(KeyName[char]) : format(char);
}

export interface Locator {
  readonly index: number;
  readonly selector: string;
}

export class Element {
  private readonly _locators: Locator[];
  private readonly _name: string;

  public constructor(name: string, locators: Locator[]) {
    this._locators = locators;
    this._name = name;
  }

  public defineDescendantElement(
    name: string, selector: string, index: number = 0
  ): Element {
    return new Element(name, [...this._locators, {index, selector}]);
  }

  public get existence(): Accessor<boolean> {
    return {
      description: `The existence of the ${this._name} element`,
      get: async driver => Boolean(await this._locateElement(driver))
    };
  }

  public get visibility(): Accessor<boolean> {
    return {
      description: `The visibility of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.isDisplayed();
      }
    };
  }

  public get tagName(): Accessor<string> {
    return {
      description: `The tag name of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<string> {
    return {
      description: `The text of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getText();
      }
    };
  }

  public get xPosition(): Accessor<number> {
    return {
      description: `The X position of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getLocation()).x;
      }
    };
  }

  public get yPosition(): Accessor<number> {
    return {
      description: `The Y position of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<number> {
    return {
      description: `The width of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<number> {
    return {
      description: `The height of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getSize()).height;
      }
    };
  }

  public attributeValue(attributeName: string): Accessor<string | null> {
    const description =
      `The value of the ${attributeName} attribute ` +
      `of the ${this._name} element`;

    return {
      description,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getAttribute(attributeName);
      }
    };
  }

  public cssValue(cssName: string): Accessor<string> {
    const description =
      `The value of the ${cssName} css of the ${this._name} element`;

    return {
      description,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getCssValue(cssName);
      }
    };
  }

  public descendantElementCount(selector: string): Accessor<number> {
    const description =
      'The count of matching descendant elements ' +
      `for the specified selector (${selector})`;

    return {
      description,
      get: async driver => {
        const element = await this._findElement(driver);
        const descendantElements = await element.findElements(By.css(selector));

        return descendantElements.length;
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
      `Send the specified key${keys.length > 1 ? 's' : ''} ` +
      `(${serializedKeys}) to the ${this._name} element`;

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

  private async _findElement(driver: WebDriver): Promise<WebElement> {
    const element = await this._locateElement(driver);

    if (!element) {
      throw new Error('Unable to locate element: ' + format(this._locators));
    }

    return element;
  }

  private async _locateElement(
    driver: WebDriver
  ): Promise<WebElement | undefined> {
    let element: WebElement | undefined;
    let elements: WebElement[] = [];

    for (const locator of this._locators) {
      if (element) {
        elements = await element.findElements(By.css(locator.selector));
      } else {
        elements = await driver.findElements(By.css(locator.selector));
      }

      element = elements[locator.index];

      if (!element) {
        break;
      }
    }

    return element;
  }
}

export function defineElement(
  name: string, selector: string, index: number = 0
): Element {
  return new Element(name, [{index, selector}]);
}
