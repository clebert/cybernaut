import {Key} from 'selenium-webdriver';
import {Action} from '../action';
import {Element, defineElement} from '../element';

describe('given an element is created', () => {
  let element: Element;

  beforeEach(() => {
    element = defineElement('<name>', '<selector>', 1);
  });

  describe('when element.existence is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.existence.description).toBe(
        'The existence of the <name> element'
      );
    });
  });

  describe('when element.visibility is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.visibility.description).toBe(
        'The visibility of the <name> element'
      );
    });
  });

  describe('when element.tagName is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.tagName.description).toBe(
        'The tag name of the <name> element'
      );
    });
  });

  describe('when element.text is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.text.description).toBe(
        'The text of the <name> element'
      );
    });
  });

  describe('when element.xPosition is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.xPosition.description).toBe(
        'The X position of the <name> element'
      );
    });
  });

  describe('when element.yPosition is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.yPosition.description).toBe(
        'The Y position of the <name> element'
      );
    });
  });

  describe('when element.width is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.width.description).toBe(
        'The width of the <name> element'
      );
    });
  });

  describe('when element.height is accessed', () => {
    test('then it should evaluate to a correctly described accessor', () => {
      expect(element.height.description).toBe(
        'The height of the <name> element'
      );
    });
  });

  describe('when element.attributeValue() is called', () => {
    test('then it should return a correctly described accessor', () => {
      expect(element.attributeValue('<attributeName>').description).toBe(
        'The value of the <attributeName> attribute ' +
        'of the <name> element'
      );
    });
  });

  describe('when element.cssValue() is called', () => {
    test('then it should return a correctly described accessor', () => {
      expect(element.cssValue('<cssName>').description).toBe(
        'The value of the <cssName> css of the <name> element'
      );
    });
  });

  describe('when element.descendantElementCount() is called', () => {
    test('then it should return a correctly described accessor', () => {
      expect(element.descendantElementCount('<selector>').description).toBe(
        'The count of matching descendant elements ' +
        'for the specified selector (<selector>)'
      );
    });
  });

  describe('when element.clearValue() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(element.clearValue().description).toBe(
        'Clear the value of the <name> element'
      );
    });
  });

  describe('when element.click() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(element.click().description).toBe(
        'Click on the <name> element'
      );
    });
  });

  describe('when element.sendKeys() is called', () => {
    let action: Action;

    beforeEach(() => {
      action = element.sendKeys("'a'", 'toString', Key.NULL);
    });

    test('then it should return a correctly described action', () => {
      expect(action.description).toBe(
        "Send the specified keys ('\\\'a\\\'', 'toString', Key.NULL) " +
        'to the <name> element'
      );

      expect(element.sendKeys(Key.NULL).description).toBe(
        'Send the specified key (Key.NULL) to the <name> element'
      );

      expect(element.sendKeys(Key.CANCEL).description).toBe(
        'Send the specified key (Key.CANCEL) to the <name> element'
      );

      expect(element.sendKeys(Key.HELP).description).toBe(
        'Send the specified key (Key.HELP) to the <name> element'
      );

      expect(element.sendKeys(Key.BACK_SPACE).description).toBe(
        'Send the specified key (Key.BACK_SPACE) to the <name> element'
      );

      expect(element.sendKeys(Key.TAB).description).toBe(
        'Send the specified key (Key.TAB) to the <name> element'
      );

      expect(element.sendKeys(Key.CLEAR).description).toBe(
        'Send the specified key (Key.CLEAR) to the <name> element'
      );

      expect(element.sendKeys(Key.RETURN).description).toBe(
        'Send the specified key (Key.RETURN) to the <name> element'
      );

      expect(element.sendKeys(Key.ENTER).description).toBe(
        'Send the specified key (Key.ENTER) to the <name> element'
      );

      expect(element.sendKeys(Key.SHIFT).description).toBe(
        'Send the specified key (Key.SHIFT) to the <name> element'
      );

      expect(element.sendKeys(Key.CONTROL).description).toBe(
        'Send the specified key (Key.CONTROL) to the <name> element'
      );

      expect(element.sendKeys(Key.ALT).description).toBe(
        'Send the specified key (Key.ALT) to the <name> element'
      );

      expect(element.sendKeys(Key.PAUSE).description).toBe(
        'Send the specified key (Key.PAUSE) to the <name> element'
      );

      expect(element.sendKeys(Key.ESCAPE).description).toBe(
        'Send the specified key (Key.ESCAPE) to the <name> element'
      );

      expect(element.sendKeys(Key.SPACE).description).toBe(
        'Send the specified key (Key.SPACE) to the <name> element'
      );

      expect(element.sendKeys(Key.PAGE_UP).description).toBe(
        'Send the specified key (Key.PAGE_UP) to the <name> element'
      );

      expect(element.sendKeys(Key.PAGE_DOWN).description).toBe(
        'Send the specified key (Key.PAGE_DOWN) to the <name> element'
      );

      expect(element.sendKeys(Key.END).description).toBe(
        'Send the specified key (Key.END) to the <name> element'
      );

      expect(element.sendKeys(Key.HOME).description).toBe(
        'Send the specified key (Key.HOME) to the <name> element'
      );

      expect(element.sendKeys(Key.ARROW_LEFT).description).toBe(
        'Send the specified key (Key.LEFT) to the <name> element'
      );

      expect(element.sendKeys(Key.LEFT).description).toBe(
        'Send the specified key (Key.LEFT) to the <name> element'
      );

      expect(element.sendKeys(Key.ARROW_UP).description).toBe(
        'Send the specified key (Key.UP) to the <name> element'
      );

      expect(element.sendKeys(Key.UP).description).toBe(
        'Send the specified key (Key.UP) to the <name> element'
      );

      expect(element.sendKeys(Key.ARROW_RIGHT).description).toBe(
        'Send the specified key (Key.RIGHT) to the <name> element'
      );

      expect(element.sendKeys(Key.RIGHT).description).toBe(
        'Send the specified key (Key.RIGHT) to the <name> element'
      );

      expect(element.sendKeys(Key.ARROW_DOWN).description).toBe(
        'Send the specified key (Key.DOWN) to the <name> element'
      );

      expect(element.sendKeys(Key.DOWN).description).toBe(
        'Send the specified key (Key.DOWN) to the <name> element'
      );

      expect(element.sendKeys(Key.INSERT).description).toBe(
        'Send the specified key (Key.INSERT) to the <name> element'
      );

      expect(element.sendKeys(Key.DELETE).description).toBe(
        'Send the specified key (Key.DELETE) to the <name> element'
      );

      expect(element.sendKeys(Key.SEMICOLON).description).toBe(
        'Send the specified key (Key.SEMICOLON) to the <name> element'
      );

      expect(element.sendKeys(Key.EQUALS).description).toBe(
        'Send the specified key (Key.EQUALS) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD0).description).toBe(
        'Send the specified key (Key.NUMPAD0) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD1).description).toBe(
        'Send the specified key (Key.NUMPAD1) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD2).description).toBe(
        'Send the specified key (Key.NUMPAD2) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD3).description).toBe(
        'Send the specified key (Key.NUMPAD3) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD4).description).toBe(
        'Send the specified key (Key.NUMPAD4) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD5).description).toBe(
        'Send the specified key (Key.NUMPAD5) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD6).description).toBe(
        'Send the specified key (Key.NUMPAD6) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD7).description).toBe(
        'Send the specified key (Key.NUMPAD7) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD8).description).toBe(
        'Send the specified key (Key.NUMPAD8) to the <name> element'
      );

      expect(element.sendKeys(Key.NUMPAD9).description).toBe(
        'Send the specified key (Key.NUMPAD9) to the <name> element'
      );

      expect(element.sendKeys(Key.MULTIPLY).description).toBe(
        'Send the specified key (Key.MULTIPLY) to the <name> element'
      );

      expect(element.sendKeys(Key.ADD).description).toBe(
        'Send the specified key (Key.ADD) to the <name> element'
      );

      expect(element.sendKeys(Key.SEPARATOR).description).toBe(
        'Send the specified key (Key.SEPARATOR) to the <name> element'
      );

      expect(element.sendKeys(Key.SUBTRACT).description).toBe(
        'Send the specified key (Key.SUBTRACT) to the <name> element'
      );

      expect(element.sendKeys(Key.DECIMAL).description).toBe(
        'Send the specified key (Key.DECIMAL) to the <name> element'
      );

      expect(element.sendKeys(Key.DIVIDE).description).toBe(
        'Send the specified key (Key.DIVIDE) to the <name> element'
      );

      expect(element.sendKeys(Key.F1).description).toBe(
        'Send the specified key (Key.F1) to the <name> element'
      );

      expect(element.sendKeys(Key.F2).description).toBe(
        'Send the specified key (Key.F2) to the <name> element'
      );

      expect(element.sendKeys(Key.F3).description).toBe(
        'Send the specified key (Key.F3) to the <name> element'
      );

      expect(element.sendKeys(Key.F4).description).toBe(
        'Send the specified key (Key.F4) to the <name> element'
      );

      expect(element.sendKeys(Key.F5).description).toBe(
        'Send the specified key (Key.F5) to the <name> element'
      );

      expect(element.sendKeys(Key.F6).description).toBe(
        'Send the specified key (Key.F6) to the <name> element'
      );

      expect(element.sendKeys(Key.F7).description).toBe(
        'Send the specified key (Key.F7) to the <name> element'
      );

      expect(element.sendKeys(Key.F8).description).toBe(
        'Send the specified key (Key.F8) to the <name> element'
      );

      expect(element.sendKeys(Key.F9).description).toBe(
        'Send the specified key (Key.F9) to the <name> element'
      );

      expect(element.sendKeys(Key.F10).description).toBe(
        'Send the specified key (Key.F10) to the <name> element'
      );

      expect(element.sendKeys(Key.F11).description).toBe(
        'Send the specified key (Key.F11) to the <name> element'
      );

      expect(element.sendKeys(Key.F12).description).toBe(
        'Send the specified key (Key.F12) to the <name> element'
      );

      expect(element.sendKeys(Key.COMMAND).description).toBe(
        'Send the specified key (Key.META) to the <name> element'
      );

      expect(element.sendKeys(Key.META).description).toBe(
        'Send the specified key (Key.META) to the <name> element'
      );
    });
  });

  describe('when element.submitForm() is called', () => {
    test('then it should return a correctly described action', () => {
      expect(element.submitForm().description).toBe(
        'Submit the form containing the <name> element'
      );
    });
  });
});
