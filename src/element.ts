import {By} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';

export class Element {
  protected readonly selector: string;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public get tagName(): Accessor<string> {
    return {
      description: {
        template: 'tag name of element {}', args: [this.selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return element.getTagName();
      }
    };
  }

  public get text(): Accessor<string> {
    return {
      description: {template: 'text of element {}', args: [this.selector]},
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return element.getText();
      }
    };
  }

  public get visibility(): Accessor<boolean> {
    return {
      description: {
        template: 'visibility of element {}', args: [this.selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return element.isDisplayed();
      }
    };
  }

  public get x(): Accessor<number> {
    return {
      description: {
        template: 'x-position of element {}', args: [this.selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return (await element.getLocation()).x;
      }
    };
  }

  public get y(): Accessor<number> {
    return {
      description: {
        template: 'y-position of element {}', args: [this.selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return (await element.getLocation()).y;
      }
    };
  }

  public get width(): Accessor<number> {
    return {
      description: {template: 'width of element {}', args: [this.selector]},
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return (await element.getSize()).width;
      }
    };
  }

  public get height(): Accessor<number> {
    return {
      description: {template: 'height of element {}', args: [this.selector]},
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return (await element.getSize()).height;
      }
    };
  }

  public cssValue(cssName: string): Accessor<string> {
    return {
      description: {
        template: 'css value {} of element {}', args: [cssName, this.selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return element.getCssValue(cssName);
      }
    };
  }

  public propertyValue(propertyName: string): Accessor<string | null> {
    return {
      description: {
        template: 'property value {} of element {}',
        args: [propertyName, this.selector]
      },
      get: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        return element.getAttribute(propertyName);
      }
    };
  }

  public clearValue(): Action {
    return {
      description: {
        template: 'clear value of element {}', args: [this.selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        await element.clear();
      }
    };
  }

  public click(): Action {
    return {
      description: {template: 'click on element {}', args: [this.selector]},
      perform: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        await element.click();
      }
    };
  }

  public sendKeys(...keys: string[]): Action {
    return {
      description: {
        template: 'send keys {} to element {}', args: [keys, this.selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        await element.sendKeys(...keys);
      }
    };
  }

  public submitForm(): Action {
    return {
      description: {
        template: 'submit form containing element {}', args: [this.selector]
      },
      perform: async driver => {
        const element = await driver.findElement(By.css(this.selector));

        await element.submit();
      }
    };
  }
}
