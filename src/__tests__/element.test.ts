// tslint:disable no-any

import {By} from 'selenium-webdriver';
import {Accessor} from '../accessor';
import {Action} from '../action';
import {Element} from '../element';

describe('given an element is created', () => {
  let element: Element;

  beforeEach(() => {
    element = new Element('<elementName>', '<elementSelector>');
  });

  describe('when element.tagName is accessed', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = element.tagName;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the tag name of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getTagName: jest.fn()
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getTagName() once', async () => {
        const getTagName = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getTagName}))
        };

        await accessor.get(driver as any);

        expect(getTagName.mock.calls.length).toBe(1);
      });

      test('then it should return the tag name of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getTagName: jest.fn().mockReturnValue('<tagName>')
          }))
        };

        expect(await accessor.get(driver as any)).toBe('<tagName>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      expect(accessor.name).toBe('the text of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getText: jest.fn()
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getText() once', async () => {
        const getText = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getText}))
        };

        await accessor.get(driver as any);

        expect(getText.mock.calls.length).toBe(1);
      });

      test('then it should return the text of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getText: jest.fn().mockReturnValue('<text>')
          }))
        };

        expect(await accessor.get(driver as any)).toBe('<text>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
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
      expect(accessor.name).toBe('the visibility of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            isDisplayed: jest.fn()
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.isDisplayed() once', async () => {
        const isDisplayed = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({isDisplayed}))
        };

        await accessor.get(driver as any);

        expect(isDisplayed.mock.calls.length).toBe(1);
      });

      test('then it should return the visibility of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            isDisplayed: jest.fn().mockReturnValue(true)
          }))
        };

        expect(await accessor.get(driver as any)).toBe(true);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      expect(accessor.name).toBe('the X position of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getLocation: jest.fn().mockReturnValue({})
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getLocation() once', async () => {
        const getLocation = jest.fn().mockReturnValue({});

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getLocation}))
        };

        await accessor.get(driver as any);

        expect(getLocation.mock.calls.length).toBe(1);
      });

      test('then it should return the X position of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getLocation: jest.fn().mockReturnValue({x: 123})
          }))
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      expect(accessor.name).toBe('the Y position of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getLocation: jest.fn().mockReturnValue({})
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getLocation() once', async () => {
        const getLocation = jest.fn().mockReturnValue({});

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getLocation}))
        };

        await accessor.get(driver as any);

        expect(getLocation.mock.calls.length).toBe(1);
      });

      test('then it should return the Y position of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getLocation: jest.fn().mockReturnValue({y: 123})
          }))
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      expect(accessor.name).toBe('the width of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getSize: jest.fn().mockReturnValue({})
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getSize() once', async () => {
        const getSize = jest.fn().mockReturnValue({});

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getSize}))
        };

        await accessor.get(driver as any);

        expect(getSize.mock.calls.length).toBe(1);
      });

      test('then it should return the width of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getSize: jest.fn().mockReturnValue({width: 123})
          }))
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      expect(accessor.name).toBe('the height of the <elementName> element');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getSize: jest.fn().mockReturnValue({})
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getSize() once', async () => {
        const getSize = jest.fn().mockReturnValue({});

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getSize}))
        };

        await accessor.get(driver as any);

        expect(getSize.mock.calls.length).toBe(1);
      });

      test('then it should return the height of the element', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getSize: jest.fn().mockReturnValue({height: 123})
          }))
        };

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
        'the value of the <attributeName> attribute ' +
        'of the <elementName> element'
      );
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getAttribute: jest.fn()
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getAttribute() once', async () => {
        const getAttribute = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(
            async () => ({getAttribute})
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
          findElement: jest.fn().mockImplementation(async () => ({
            getAttribute: jest.fn().mockReturnValue('<attributeValue>')
          }))
        };

        expect(await accessor.get(driver as any)).toBe('<attributeValue>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
        'the value of the <cssName> css of the <elementName> element'
      );
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getCssValue: jest.fn()
          }))
        };

        await accessor.get(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.getCssValue() once', async () => {
        const getCssValue = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({getCssValue}))
        };

        await accessor.get(driver as any);

        expect(getCssValue.mock.calls.length).toBe(1);
        expect(getCssValue.mock.calls[0][0]).toBe('<cssName>');
      });

      const name = 'then it should return the value of the css of the element';

      test(name, async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            getCssValue: jest.fn().mockReturnValue('<cssValue>')
          }))
        };

        expect(await accessor.get(driver as any)).toBe('<cssValue>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            clear: jest.fn()
          }))
        };

        await action.perform(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.clear() once', async () => {
        const clear = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({clear}))
        };

        await action.perform(driver as any);

        expect(clear.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
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
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            click: jest.fn()
          }))
        };

        await action.perform(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.click() once', async () => {
        const click = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({click}))
        };

        await action.perform(driver as any);

        expect(click.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when element.sendKeys() is called', () => {
    // TODO
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
      test('then it should call driver.findElement() once', async () => {
        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({
            submit: jest.fn()
          }))
        };

        await action.perform(driver as any);

        expect(driver.findElement.mock.calls.length).toBe(1);

        expect(driver.findElement.mock.calls[0][0]).toEqual(
          By.css('<elementSelector>')
        );
      });

      test('then it should call element.submit() once', async () => {
        const submit = jest.fn();

        const driver = {
          findElement: jest.fn().mockImplementation(async () => ({submit}))
        };

        await action.perform(driver as any);

        expect(submit.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          findElement: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });
});
