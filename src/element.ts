import {By, Key, WebDriver, WebElement} from 'selenium-webdriver';
import {Accessor} from './core/accessor';
import {Action} from './core/action';
import {format} from './core/utils';

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

  public get existence(): Accessor<WebDriver, boolean> {
    return {
      description: `The existence of the ${this._name} element`,
      get: async driver => Boolean(await this._locateElement(driver))
    };
  }

  public get visibility(): Accessor<WebDriver, boolean> {
    return {
      description: `The visibility of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.isDisplayed();
      }
    };
  }

  public get tagName(): Accessor<WebDriver, string> {
    return {
      description: `The tag name of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<WebDriver, string> {
    return {
      description: `The text of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return element.getText();
      }
    };
  }

  public get xPosition(): Accessor<WebDriver, number> {
    return {
      description: `The X position of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getLocation()).x;
      }
    };
  }

  public get yPosition(): Accessor<WebDriver, number> {
    return {
      description: `The Y position of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<WebDriver, number> {
    return {
      description: `The width of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<WebDriver, number> {
    return {
      description: `The height of the ${this._name} element`,
      get: async driver => {
        const element = await this._findElement(driver);

        return (await element.getSize()).height;
      }
    };
  }

  public attributeValue(
    attributeName: string
  ): Accessor<WebDriver, string | null> {
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

  public cssValue(cssName: string): Accessor<WebDriver, string> {
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

  public descendantElementCount(selector: string): Accessor<WebDriver, number> {
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

  public clearValue(): Action<WebDriver> {
    return {
      description: `Clear the value of the ${this._name} element`,
      perform: async driver => {
        const element = await this._findElement(driver);

        await element.clear();
      }
    };
  }

  public click(): Action<WebDriver> {
    return {
      description: `Click on the ${this._name} element`,
      perform: async driver => {
        const element = await this._findElement(driver);

        await element.click();
      }
    };
  }

  public sendKeys(...keys: string[]): Action<WebDriver> {
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

  public submitForm(): Action<WebDriver> {
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
      elements = element ?
        await element.findElements(By.css(locator.selector)) :
        await driver.findElements(By.css(locator.selector));

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
