// tslint:disable no-any

import {Accessor} from '../accessor';
import {Action} from '../action';
import {Browser, Script} from '../browser';

describe('given a browser is created', () => {
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser();
  });

  describe('when browser.pageTitle is accessed', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = browser.pageTitle;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the title of the page');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.getTitle() once', async () => {
        const driver = {getTitle: jest.fn()};

        await accessor.get(driver as any);

        expect(driver.getTitle.mock.calls.length).toBe(1);
      });

      test('then it should return the title of the page', async () => {
        const driver = {
          getTitle: jest.fn().mockImplementation(async () => '<pageTitle>')
        };

        expect(await accessor.get(driver as any)).toBe('<pageTitle>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          getTitle: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.pageUrl is accessed', () => {
    let accessor: Accessor<string>;

    beforeEach(() => {
      accessor = browser.pageUrl;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the URL of the page');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.getCurrentUrl() once', async () => {
        const driver = {getCurrentUrl: jest.fn()};

        await accessor.get(driver as any);

        expect(driver.getCurrentUrl.mock.calls.length).toBe(1);
      });

      test('then it should return the URL of the page', async () => {
        const driver = {
          getCurrentUrl: jest.fn().mockImplementation(async () => '<pageUrl>')
        };

        expect(await accessor.get(driver as any)).toBe('<pageUrl>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          getCurrentUrl: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.windowXPosition is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = browser.windowXPosition;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the X position of the window');
    });

    describe('when accessor.get() is called', () => {
      const name =
        'then it should call driver.manage().window().getPosition() once';

      test(name, async () => {
        const getPosition = jest.fn().mockImplementation(async () => ({}));
        const driver = {manage: () => ({window: () => ({getPosition})})};

        await accessor.get(driver as any);

        expect(getPosition.mock.calls.length).toBe(1);
      });

      test('then it should return the X position of the window', async () => {
        const getPosition = jest.fn().mockImplementation(async () => ({
          x: 123
        }));

        const driver = {manage: () => ({window: () => ({getPosition})})};

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const getPosition = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({getPosition})})};

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.windowYPosition is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = browser.windowYPosition;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the Y position of the window');
    });

    describe('when accessor.get() is called', () => {
      const name =
        'then it should call driver.manage().window().getPosition() once';

      test(name, async () => {
        const getPosition = jest.fn().mockImplementation(async () => ({}));
        const driver = {manage: () => ({window: () => ({getPosition})})};

        await accessor.get(driver as any);

        expect(getPosition.mock.calls.length).toBe(1);
      });

      test('then it should return the Y position of the window', async () => {
        const getPosition = jest.fn().mockImplementation(async () => ({
          y: 123
        }));

        const driver = {manage: () => ({window: () => ({getPosition})})};

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const getPosition = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({getPosition})})};

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.windowWidth is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = browser.windowWidth;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the width of the window');
    });

    describe('when accessor.get() is called', () => {
      const name =
        'then it should call driver.manage().window().getSize() once';

      test(name, async () => {
        const getSize = jest.fn().mockImplementation(async () => ({}));
        const driver = {manage: () => ({window: () => ({getSize})})};

        await accessor.get(driver as any);

        expect(getSize.mock.calls.length).toBe(1);
      });

      test('then it should return the width of the window', async () => {
        const getSize = jest.fn().mockImplementation(async () => ({
          width: 123
        }));

        const driver = {manage: () => ({window: () => ({getSize})})};

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const getSize = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({getSize})})};

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.windowHeight is accessed', () => {
    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = browser.windowHeight;
    });

    test('then it should evaluate to an accessor', () => {
      expect(accessor.name).toBe('the height of the window');
    });

    describe('when accessor.get() is called', () => {
      const name =
        'then it should call driver.manage().window().getSize() once';

      test(name, async () => {
        const getSize = jest.fn().mockImplementation(async () => ({}));
        const driver = {manage: () => ({window: () => ({getSize})})};

        await accessor.get(driver as any);

        expect(getSize.mock.calls.length).toBe(1);
      });

      test('then it should return the height of the window', async () => {
        const getSize = jest.fn().mockImplementation(async () => ({
          height: 123
        }));

        const driver = {manage: () => ({window: () => ({getSize})})};

        expect(await accessor.get(driver as any)).toBe(123);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const getSize = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({getSize})})};

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.scriptResult() is called', () => {
    const script: Script = () => undefined;

    let accessor: Accessor<number>;

    beforeEach(() => {
      accessor = browser.scriptResult('<scriptName>', script);
    });

    test('then it should return an accessor', () => {
      expect(accessor.name).toBe('the result of the <scriptName> script');
    });

    describe('when accessor.get() is called', () => {
      test('then it should call driver.executeAsyncScript() once', async () => {
        const driver = {executeAsyncScript: jest.fn()};

        await accessor.get(driver as any);

        expect(driver.executeAsyncScript.mock.calls.length).toBe(1);
        expect(driver.executeAsyncScript.mock.calls[0][0]).toBe(script);
      });

      test('then it should return the result of the script', async () => {
        const driver = {
          executeAsyncScript: jest.fn().mockImplementation(
            async () => '<scriptResult>'
          )
        };

        expect(await accessor.get(driver as any)).toBe('<scriptResult>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          executeAsyncScript: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(accessor.get(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.executeScript() is called', () => {
    const script: Script = () => undefined;

    let action: Action;

    beforeEach(() => {
      action = browser.executeScript('<scriptName>', script);
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('execute the <scriptName> script');
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.executeAsyncScript() once', async () => {
        const driver = {executeAsyncScript: jest.fn()};

        await action.perform(driver as any);

        expect(driver.executeAsyncScript.mock.calls.length).toBe(1);
        expect(driver.executeAsyncScript.mock.calls[0][0]).toBe(script);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const driver = {
          executeAsyncScript: jest.fn().mockImplementation(async () => {
            throw error;
          })
        };

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.loadPage() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.loadPage('<url>');
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('load the page <url>');
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.navigate().to() once', async () => {
        const to = jest.fn();
        const driver = {navigate: () => ({to})};

        await action.perform(driver as any);

        expect(to.mock.calls.length).toBe(1);
        expect(to.mock.calls[0][0]).toBe('<url>');
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const to = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {navigate: () => ({to})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.maximizeWindow() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.maximizeWindow();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('maximize the window');
    });

    describe('when action.perform() is called', () => {
      const name =
        'then it should call driver.manage().window().maximize() once';

      test(name, async () => {
        const maximize = jest.fn();
        const driver = {manage: () => ({window: () => ({maximize})})};

        await action.perform(driver as any);

        expect(maximize.mock.calls.length).toBe(1);
        expect(maximize.mock.calls[0][0]).toBe(undefined);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const maximize = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({maximize})})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.navigateBack() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.navigateBack();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('navigate back');
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.navigate().back() once', async () => {
        const back = jest.fn();
        const driver = {navigate: () => ({back})};

        await action.perform(driver as any);

        expect(back.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const back = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {navigate: () => ({back})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.navigateForward() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.navigateForward();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('navigate forward');
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.navigate().forward() once', async () => {
        const forward = jest.fn();
        const driver = {navigate: () => ({forward})};

        await action.perform(driver as any);

        expect(forward.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const forward = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {navigate: () => ({forward})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.reloadPage() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.reloadPage();
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('reload the page');
    });

    describe('when action.perform() is called', () => {
      test('then it should call driver.navigate().refresh() once', async () => {
        const refresh = jest.fn();
        const driver = {navigate: () => ({refresh})};

        await action.perform(driver as any);

        expect(refresh.mock.calls.length).toBe(1);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const refresh = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {navigate: () => ({refresh})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.setWindowPosition() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.setWindowPosition(123, 456);
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('set the window position to 123,456');
    });

    describe('when action.perform() is called', () => {
      const name =
        'then it should call driver.manage().window().setPosition() once';

      test(name, async () => {
        const setPosition = jest.fn();
        const driver = {manage: () => ({window: () => ({setPosition})})};

        await action.perform(driver as any);

        expect(setPosition.mock.calls.length).toBe(1);
        expect(setPosition.mock.calls[0][0]).toBe(123);
        expect(setPosition.mock.calls[0][1]).toBe(456);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const setPosition = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({setPosition})})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.setWindowSize() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = browser.setWindowSize(123, 456);
    });

    test('then it should return an action', () => {
      expect(action.description).toBe('set the window size to 123x456');
    });

    describe('when action.perform() is called', () => {
      const name =
        'then it should call driver.manage().window().setSize() once';

      test(name, async () => {
        const setSize = jest.fn();
        const driver = {manage: () => ({window: () => ({setSize})})};

        await action.perform(driver as any);

        expect(setSize.mock.calls.length).toBe(1);
        expect(setSize.mock.calls[0][0]).toBe(123);
        expect(setSize.mock.calls[0][1]).toBe(456);
      });

      test('then it should throw an error', async () => {
        const error = new Error('<message>');

        const setSize = jest.fn().mockImplementation(async () => {
          throw error;
        });

        const driver = {manage: () => ({window: () => ({setSize})})};

        await expect(action.perform(driver as any)).rejects.toEqual(error);
      });
    });
  });

  describe('when browser.sleep() is called', () => {
    test('then it should return an action', () => {
      expect(browser.sleep(1).description).toBe('sleep for 1 ms');

      expect(browser.sleep(2, '<reason>').description).toBe(
        'sleep for 2 ms because <reason>'
      );
    });

    describe('when action.perform() is called', () => {
      const name = 'then it should return a promise ' +
        'that resolves after the specified amount of time';

      test(name, async () => {
        try {
          jest.useFakeTimers();

          const durationInMillis = 123;

          let resolved = false;

          const promise = browser.sleep(durationInMillis).perform(
            {} as any
          ).then(() => resolved = true);

          await Promise.resolve();
          await Promise.resolve();

          expect(resolved).toBe(false);

          jest.runTimersToTime(durationInMillis - 1);

          await Promise.resolve();
          await Promise.resolve();

          expect(resolved).toBe(false);

          jest.runTimersToTime(1);

          await Promise.resolve();
          await Promise.resolve();

          expect(resolved).toBe(true);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });
});
