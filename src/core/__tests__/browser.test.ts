import {Browser, Script} from '../browser';

describe('given a browser is created', () => {
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser();
  });

  describe('when browser.pageTitle is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(browser.pageTitle.description).toBe('The title of the page');
    });
  });

  describe('when browser.pageUrl is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(browser.pageUrl.description).toBe('The URL of the page');
    });
  });

  describe('when browser.windowXPosition is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(browser.windowXPosition.description).toBe(
        'The X position of the window'
      );
    });
  });

  describe('when browser.windowYPosition is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(browser.windowYPosition.description).toBe(
        'The Y position of the window'
      );
    });
  });

  describe('when browser.windowWidth is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(browser.windowWidth.description).toBe('The width of the window');
    });
  });

  describe('when browser.windowHeight is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(browser.windowHeight.description).toBe('The height of the window');
    });
  });

  describe('when browser.elementCount() is called', () => {
    test('then it should return a correctly described accessor', () => {
      expect(browser.elementCount('<selector>').description).toBe(
        'The count of matching elements for the specified selector (<selector>)'
      );
    });
  });

  describe('when browser.scriptResult() is called', () => {
    test('then it should return a correctly described accessor', () => {
      const script: Script = () => undefined;

      expect(browser.scriptResult('<scriptName>', script).description).toBe(
        'The result of the <scriptName> script'
      );
    });
  });

  describe('when browser.executeScript() is called', () => {
    test('then it should return a correctly described action', () => {
      const script: Script = () => undefined;

      expect(browser.executeScript('<scriptName>', script).description).toBe(
        'Execute the <scriptName> script'
      );
    });
  });

  describe('when browser.loadPage() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.loadPage('<url>').description).toBe(
        'Load the page at <url>'
      );
    });
  });

  describe('when browser.maximizeWindow() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.maximizeWindow().description).toBe('Maximize the window');
    });
  });

  describe('when browser.navigateBack() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.navigateBack().description).toBe('Navigate back');
    });
  });

  describe('when browser.navigateForward() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.navigateForward().description).toBe('Navigate forward');
    });
  });

  describe('when browser.reloadPage() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.reloadPage().description).toBe('Reload the page');
    });
  });

  describe('when browser.setWindowPosition() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.setWindowPosition(123, 456).description).toBe(
        'Set the window position to 123,456'
      );
    });
  });

  describe('when browser.setWindowSize() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.setWindowSize(123, 456).description).toBe(
        'Set the window size to 123x456'
      );
    });
  });

  describe('when browser.sleep() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(browser.sleep(1).description).toBe('Sleep for 1 ms');

      expect(browser.sleep(2, '<reason>').description).toBe(
        'Sleep for 2 ms, because <reason>'
      );
    });
  });
});
