// tslint:disable no-any

import {By, Key} from 'selenium-webdriver';
import {Accessor} from '../accessor';
import {Action} from '../action';
import {Element} from '../element';

describe('given an element is created', () => {
  let element: Element;
  let error: Error;

  beforeEach(() => {
    element = new Element('<elementName>', '<elementSelector>', 1);
    error = new Error('Unable to locate element: ' + element.toString());
  });

  describe('when element.tagName is accessed', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = element.tagName;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The tag name of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getTagName: jest.fn()}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getTagName() once', async () => {
        const getTagName = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getTagName}
          ])
        };

        await accessor.get(driver as any);

        expect(getTagName.mock.calls.length).toBe(1);
      });

      test('then it should return the tag name of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getTagName: jest.fn().mockReturnValue('<tagName>')}
          ])
        };

        expect(await accessor.get(driver as any)).toBe('<tagName>');
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.text is accessed', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = element.text;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The text of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getText: jest.fn()}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getText() once', async () => {
        const getText = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getText}
          ])
        };

        await accessor.get(driver as any);

        expect(getText.mock.calls.length).toBe(1);
      });

      test('then it should return the text of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getText: jest.fn().mockReturnValue('<text>')}
          ])
        };

        expect(await accessor.get(driver as any)).toBe('<text>');
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.existence is accessed', () => {
    let accessor: Accessor<boolean>;

    beforeEach(() => {
      accessor = element.existence;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The existence of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should return true', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}, {}])
        };

        expect(await accessor.get(driver as any)).toBe(true);
      });

      test('then it should return false', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        expect(await accessor.get(driver as any)).toBe(false);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.visibility is accessed', () => {
    let accessor: Accessor<boolean>;

    beforeEach(() => {
      accessor = element.visibility;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The visibility of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {isDisplayed: jest.fn()}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].isDisplayed() once', async () => {
        const isDisplayed = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {isDisplayed}
          ])
        };

        await accessor.get(driver as any);

        expect(isDisplayed.mock.calls.length).toBe(1);
      });

      test('then it should return the visibility of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {isDisplayed: jest.fn().mockReturnValue(true)}
          ])
        };

        expect(await accessor.get(driver as any)).toBe(true);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.xPosition is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = element.xPosition;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The X position of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getLocation: jest.fn().mockReturnValue({})}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getLocation() once', async () => {
        const getLocation = jest.fn().mockReturnValue({});

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getLocation}
          ])
        };

        await accessor.get(driver as any);

        expect(getLocation.mock.calls.length).toBe(1);
      });

      test('then it should return the X position of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getLocation: jest.fn().mockReturnValue({x: 123})}
          ])
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.yPosition is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = element.yPosition;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The Y position of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getLocation: jest.fn().mockReturnValue({})}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getLocation() once', async () => {
        const getLocation = jest.fn().mockReturnValue({});

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getLocation}
          ])
        };

        await accessor.get(driver as any);

        expect(getLocation.mock.calls.length).toBe(1);
      });

      test('then it should return the Y position of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getLocation: jest.fn().mockReturnValue({y: 123})}
          ])
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.width is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = element.width;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The width of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getSize: jest.fn().mockReturnValue({})}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getSize() once', async () => {
        const getSize = jest.fn().mockReturnValue({});

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getSize}
          ])
        };

        await accessor.get(driver as any);

        expect(getSize.mock.calls.length).toBe(1);
      });

      test('then it should return the width of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getSize: jest.fn().mockReturnValue({width: 123})}
          ])
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.height is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = element.height;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('The height of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getSize: jest.fn().mockReturnValue({})}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getSize() once', async () => {
        const getSize = jest.fn().mockReturnValue({});

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getSize}
          ])
        };

        await accessor.get(driver as any);

        expect(getSize.mock.calls.length).toBe(1);
      });

      test('then it should return the height of the element', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getSize: jest.fn().mockReturnValue({height: 123})}
          ])
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.attributeValue() is called', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = element.attributeValue('<attributeName>');
    });

    test('then it should return an accessor', () => {
      expect(accessor.name).toBe(
        'The value of the <attributeName> attribute ' +
        'of the <elementName> element'
      );
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getAttribute: jest.fn()}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getAttribute() once', async () => {
        const getAttribute = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(
            async () => [{}, {getAttribute}]
          )
        };

        await accessor.get(driver as any);

        expect(getAttribute.mock.calls.length).toBe(1);
        expect(getAttribute.mock.calls[0][0]).toBe('<attributeName>');
      });

      const name =
        'then it should return the value of the attribute of the element';

      test(name, async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getAttribute: jest.fn().mockReturnValue('<attributeValue>')}
          ])
        };

        expect(await accessor.get(driver as any)).toBe('<attributeValue>');
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.cssValue() is called', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = element.cssValue('<cssName>');
    });

    test('then it should return an accessor', () => {
      expect(accessor.name).toBe(
        'The value of the <cssName> css of the <elementName> element'
      );
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getCssValue: jest.fn()}
          ])
        };

        await accessor.get(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].getCssValue() once', async () => {
        const getCssValue = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getCssValue}
          ])
        };

        await accessor.get(driver as any);

        expect(getCssValue.mock.calls.length).toBe(1);
        expect(getCssValue.mock.calls[0][0]).toBe('<cssName>');
      });

      const name = 'then it should return the value of the css of the element';

      test(name, async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {getCssValue: jest.fn().mockReturnValue('<cssValue>')}
          ])
        };

        expect(await accessor.get(driver as any)).toBe('<cssValue>');
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.clearValue() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = element.clearValue();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe(
        'Clear the value of the <elementName> element'
      );
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {clear: jest.fn()}
          ])
        };

        await action.perform(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].clear() once', async () => {
        const clear = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}, {clear}])
        };

        await action.perform(driver as any);

        expect(clear.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.click() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = element.click();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('Click on the <elementName> element');
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {click: jest.fn()}
          ])
        };

        await action.perform(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].click() once', async () => {
        const click = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}, {click}])
        };

        await action.perform(driver as any);

        expect(click.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.sendKeys() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = element.sendKeys('a', 'toString', Key.NULL);
    });

    test('then it should return an action', () => {
      expect(action.description).toBe(
        "Send the keys 'a', 'toString', Key.NULL to the <elementName> element"
      );

      expect(element.sendKeys(Key.NULL).description).toBe(
        'Send the key Key.NULL to the <elementName> element'
      );

      expect(element.sendKeys(Key.CANCEL).description).toBe(
        'Send the key Key.CANCEL to the <elementName> element'
      );

      expect(element.sendKeys(Key.HELP).description).toBe(
        'Send the key Key.HELP to the <elementName> element'
      );

      expect(element.sendKeys(Key.BACK_SPACE).description).toBe(
        'Send the key Key.BACK_SPACE to the <elementName> element'
      );

      expect(element.sendKeys(Key.TAB).description).toBe(
        'Send the key Key.TAB to the <elementName> element'
      );

      expect(element.sendKeys(Key.CLEAR).description).toBe(
        'Send the key Key.CLEAR to the <elementName> element'
      );

      expect(element.sendKeys(Key.RETURN).description).toBe(
        'Send the key Key.RETURN to the <elementName> element'
      );

      expect(element.sendKeys(Key.ENTER).description).toBe(
        'Send the key Key.ENTER to the <elementName> element'
      );

      expect(element.sendKeys(Key.SHIFT).description).toBe(
        'Send the key Key.SHIFT to the <elementName> element'
      );

      expect(element.sendKeys(Key.CONTROL).description).toBe(
        'Send the key Key.CONTROL to the <elementName> element'
      );

      expect(element.sendKeys(Key.ALT).description).toBe(
        'Send the key Key.ALT to the <elementName> element'
      );

      expect(element.sendKeys(Key.PAUSE).description).toBe(
        'Send the key Key.PAUSE to the <elementName> element'
      );

      expect(element.sendKeys(Key.ESCAPE).description).toBe(
        'Send the key Key.ESCAPE to the <elementName> element'
      );

      expect(element.sendKeys(Key.SPACE).description).toBe(
        'Send the key Key.SPACE to the <elementName> element'
      );

      expect(element.sendKeys(Key.PAGE_UP).description).toBe(
        'Send the key Key.PAGE_UP to the <elementName> element'
      );

      expect(element.sendKeys(Key.PAGE_DOWN).description).toBe(
        'Send the key Key.PAGE_DOWN to the <elementName> element'
      );

      expect(element.sendKeys(Key.END).description).toBe(
        'Send the key Key.END to the <elementName> element'
      );

      expect(element.sendKeys(Key.HOME).description).toBe(
        'Send the key Key.HOME to the <elementName> element'
      );

      expect(element.sendKeys(Key.ARROW_LEFT).description).toBe(
        'Send the key Key.LEFT to the <elementName> element'
      );

      expect(element.sendKeys(Key.LEFT).description).toBe(
        'Send the key Key.LEFT to the <elementName> element'
      );

      expect(element.sendKeys(Key.ARROW_UP).description).toBe(
        'Send the key Key.UP to the <elementName> element'
      );

      expect(element.sendKeys(Key.UP).description).toBe(
        'Send the key Key.UP to the <elementName> element'
      );

      expect(element.sendKeys(Key.ARROW_RIGHT).description).toBe(
        'Send the key Key.RIGHT to the <elementName> element'
      );

      expect(element.sendKeys(Key.RIGHT).description).toBe(
        'Send the key Key.RIGHT to the <elementName> element'
      );

      expect(element.sendKeys(Key.ARROW_DOWN).description).toBe(
        'Send the key Key.DOWN to the <elementName> element'
      );

      expect(element.sendKeys(Key.DOWN).description).toBe(
        'Send the key Key.DOWN to the <elementName> element'
      );

      expect(element.sendKeys(Key.INSERT).description).toBe(
        'Send the key Key.INSERT to the <elementName> element'
      );

      expect(element.sendKeys(Key.DELETE).description).toBe(
        'Send the key Key.DELETE to the <elementName> element'
      );

      expect(element.sendKeys(Key.SEMICOLON).description).toBe(
        'Send the key Key.SEMICOLON to the <elementName> element'
      );

      expect(element.sendKeys(Key.EQUALS).description).toBe(
        'Send the key Key.EQUALS to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD0).description).toBe(
        'Send the key Key.NUMPAD0 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD1).description).toBe(
        'Send the key Key.NUMPAD1 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD2).description).toBe(
        'Send the key Key.NUMPAD2 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD3).description).toBe(
        'Send the key Key.NUMPAD3 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD4).description).toBe(
        'Send the key Key.NUMPAD4 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD5).description).toBe(
        'Send the key Key.NUMPAD5 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD6).description).toBe(
        'Send the key Key.NUMPAD6 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD7).description).toBe(
        'Send the key Key.NUMPAD7 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD8).description).toBe(
        'Send the key Key.NUMPAD8 to the <elementName> element'
      );

      expect(element.sendKeys(Key.NUMPAD9).description).toBe(
        'Send the key Key.NUMPAD9 to the <elementName> element'
      );

      expect(element.sendKeys(Key.MULTIPLY).description).toBe(
        'Send the key Key.MULTIPLY to the <elementName> element'
      );

      expect(element.sendKeys(Key.ADD).description).toBe(
        'Send the key Key.ADD to the <elementName> element'
      );

      expect(element.sendKeys(Key.SEPARATOR).description).toBe(
        'Send the key Key.SEPARATOR to the <elementName> element'
      );

      expect(element.sendKeys(Key.SUBTRACT).description).toBe(
        'Send the key Key.SUBTRACT to the <elementName> element'
      );

      expect(element.sendKeys(Key.DECIMAL).description).toBe(
        'Send the key Key.DECIMAL to the <elementName> element'
      );

      expect(element.sendKeys(Key.DIVIDE).description).toBe(
        'Send the key Key.DIVIDE to the <elementName> element'
      );

      expect(element.sendKeys(Key.F1).description).toBe(
        'Send the key Key.F1 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F2).description).toBe(
        'Send the key Key.F2 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F3).description).toBe(
        'Send the key Key.F3 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F4).description).toBe(
        'Send the key Key.F4 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F5).description).toBe(
        'Send the key Key.F5 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F6).description).toBe(
        'Send the key Key.F6 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F7).description).toBe(
        'Send the key Key.F7 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F8).description).toBe(
        'Send the key Key.F8 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F9).description).toBe(
        'Send the key Key.F9 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F10).description).toBe(
        'Send the key Key.F10 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F11).description).toBe(
        'Send the key Key.F11 to the <elementName> element'
      );

      expect(element.sendKeys(Key.F12).description).toBe(
        'Send the key Key.F12 to the <elementName> element'
      );

      expect(element.sendKeys(Key.COMMAND).description).toBe(
        'Send the key Key.META to the <elementName> element'
      );

      expect(element.sendKeys(Key.META).description).toBe(
        'Send the key Key.META to the <elementName> element'
      );
    });

    test('then it should throw an error', async () => {
      expect(() => element.sendKeys()).toThrowError(
        'At least one key must be specified'
      );
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {sendKeys: jest.fn()}
          ])
        };

        await action.perform(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].sendKeys() once', async () => {
        const sendKeys = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {sendKeys}
          ])
        };

        await action.perform(driver as any);

        expect(sendKeys.mock.calls.length).toBe(1);
        expect(sendKeys.mock.calls[0][0]).toBe('a');
        expect(sendKeys.mock.calls[0][1]).toBe('toString');
        expect(sendKeys.mock.calls[0][2]).toBe(Key.NULL);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.submitForm() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = element.submitForm();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe(
        'Submit the form containing the <elementName> element'
      );
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.findElements() once', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [
            {}, {submit: jest.fn()}
          ])
        };

        await action.perform(driver as any);

        expect(driver.findElements.mock.calls.length).toBe(1);

        expect(driver.findElements.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call elements[1].submit() once', async () => {
        const submit = jest.fn();

        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}, {submit}])
        };

        await action.perform(driver as any);

        expect(submit.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const driver = {
          findElements: jest.fn().mockImplementation(async () => [{}])
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.toString() is called', () => {
    let stringRepresentation: string;

    beforeEach(() => {
      stringRepresentation = element.toString();
    });

    test('then it should return a string representation of itself', () => {
      expect(stringRepresentation).toBe(
        "{ name: '<elementName>', selector: '<elementSelector>', index: 1 }"
      );
    });
  });
});
