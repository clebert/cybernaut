import {By, Key} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';

const KeyName = Object.create(null);

for (const keyName of Object.keys(Key) as (keyof Key)[]) {
  KeyName[Key[keyName]] = keyName;
}

function translate(char: string): string {
  return KeyName[char] ? 'Key.' + String(KeyName[char]) : char;
}

export class Element {
  private readonly _name: string;
  private readonly _selector: string;

  public constructor(name: string, selector: string) {
    this._name = name;
    this._selector = selector;
  }

  public get tagName(): Accessor<string> {
    return {
      name: 'the tag name of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<string> {
    return {
      name: 'the text of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getText();
      }
    };
  }

  public get visibility(): Accessor<boolean> {
    return {
      name: 'the visibility of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.isDisplayed();
      }
    };
  }

  public get xPosition(): Accessor<number> {
    return {
      name: 'the X position of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getLocation()).x;
      }
    };
  }

  public get yPosition(): Accessor<number> {
    return {
      name: 'the Y position of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<number> {
    return {
      name: 'the width of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<number> {
    return {
      name: 'the height of the ' + this._name,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return (await element.getSize()).height;
      }
    };
  }

  public cssValue(cssName: string): Accessor<string> {
    return {
      name: `the css value ${cssName} of the ${this._name}`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getCssValue(cssName);
      }
    };
  }

  public propertyValue(propertyName: string): Accessor<string | null> {
    return {
      name: `the property value ${propertyName} of the ${this._name}`,
      get: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        return element.getAttribute(propertyName);
      }
    };
  }

  public clearValue(): Action {
    return {
      description: 'clear the value of the ' + this._name,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.clear();
      }
    };
  }

  public click(): Action {
    return {
      description: 'click on the ' + this._name,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.click();
      }
    };
  }

  public sendKeys(...keys: string[]): Action {
    return {
      description: `send the keys ${keys.map(translate)} to the ${this._name}`,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.sendKeys(...keys);
      }
    };
  }

  public submitForm(): Action {
    return {
      description: 'submit the form containing the ' + this._name,
      perform: async driver => {
        const element = await driver.findElement(By.css(this._selector));

        await element.submit();
      }
    };
  }
}
