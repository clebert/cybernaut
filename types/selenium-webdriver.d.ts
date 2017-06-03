// tslint:disable max-line-length no-any promise-function-async

// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html
// https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/index.js

declare module 'selenium-webdriver' {
  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Type.html
  type Type = 'BROWSER' | 'CLIENT' | 'DRIVER' | 'PERFORMANCE' | 'SERVER';

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Alert.html
  interface Alert {
    accept(): Promise<void>;
    authenticateAs(username: string, password: string): Promise<void>;
    dismiss(): Promise<void>;
    getText(): Promise<string>;
    sendKeys(text: string): Promise<void>;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Options.Cookie.html
  interface Cookie {
    name: string;
    value: string;

    domain?: string;
    expiry?: Date | number;
    httpOnly?: boolean;
    path?: string;
    secure?: boolean;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Entry.html
  interface Entry {
    level: Level;
    message: string;
    timestamp: number;
    type: string;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging_exports_Level.html
  interface Level {
    name: string;
    value: number;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Logs.html
  interface Logs {
    get(type: Type): Promise<Entry[]>;
    getAvailableLogTypes(): Promise<Type[]>;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Navigation.html
  interface Navigation {
    back(): Promise<void>;
    forward(): Promise<void>;
    refresh(): Promise<void>;
    to(url: string): Promise<void>;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Options.html
  interface Options {
    addCookie(spec: Cookie): Promise<void>;
    deleteAllCookies(): Promise<void>;
    deleteCookie(name: string): Promise<void>;
    getCookie(name: string): Promise<Cookie | null>;
    getCookies(): Promise<Cookie[]>;
    logs(): Logs;
    setTimeouts(timeouts: Timeouts): Promise<void>;
    window(): Window;
  }

  interface Point {
    x: number;
    y: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface Speed {
    xspeed: number;
    yspeed: number;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_TargetLocator.html
  interface TargetLocator {
    activeElement(): Promise<WebElement>;
    alert(): Promise<Alert>;
    defaultContent(): Promise<void>;
    frame(id: number | WebElement | null): Promise<void>;
    window(nameOrHandle: string): Promise<void>;
  }

  interface Timeouts {
    implicit?: number;
    pageLoad?: number;
    script?: number;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Window.html
  interface Window {
    getPosition(): Promise<Point>;
    getSize(): Promise<Size>;
    maximize(): Promise<void>;
    setPosition(x: number, y: number): Promise<void>;
    setSize(width: number, height: number): Promise<void>;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Button.html
  export enum Button {
    LEFT,
    MIDDLE,
    RIGHT
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
  export interface Key {
    NULL: string;
    CANCEL: string; // ^break
    HELP: string;
    BACK_SPACE: string;
    TAB: string;
    CLEAR: string;
    RETURN: string;
    ENTER: string;
    SHIFT: string;
    CONTROL: string;
    ALT: string;
    PAUSE: string;
    ESCAPE: string;
    SPACE: string;
    PAGE_UP: string;
    PAGE_DOWN: string;
    END: string;
    HOME: string;
    ARROW_LEFT: string;
    LEFT: string;
    ARROW_UP: string;
    UP: string;
    ARROW_RIGHT: string;
    RIGHT: string;
    ARROW_DOWN: string;
    DOWN: string;
    INSERT: string;
    DELETE: string;
    SEMICOLON: string;
    EQUALS: string;

    NUMPAD0: string; // number pad keys
    NUMPAD1: string;
    NUMPAD2: string;
    NUMPAD3: string;
    NUMPAD4: string;
    NUMPAD5: string;
    NUMPAD6: string;
    NUMPAD7: string;
    NUMPAD8: string;
    NUMPAD9: string;
    MULTIPLY: string;
    ADD: string;
    SEPARATOR: string;
    SUBTRACT: string;
    DECIMAL: string;
    DIVIDE: string;

    F1: string; // function keys
    F2: string;
    F3: string;
    F4: string;
    F5: string;
    F6: string;
    F7: string;
    F8: string;
    F9: string;
    F10: string;
    F11: string;
    F12: string;

    COMMAND: string; // Apple command key
    META: string; // Windows key
  }

  export const Key: Key;

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/actions_exports_ActionSequence.html
  export class ActionSequence {
    public click(
      elementOrButton?: WebElement | Button,
      button?: Button
    ): ActionSequence;
    public doubleClick(
      elementOrButton?: WebElement | Button,
      button?: Button
    ): ActionSequence;
    public dragAndDrop(
      element: WebElement,
      location: WebElement | Point
    ): ActionSequence;
    public keyDown(key: Key): ActionSequence;
    public keyUp(key: Key): ActionSequence;
    public mouseDown(
      elementOrButton?: WebElement | Button,
      button?: Button
    ): ActionSequence;
    public mouseMove(
      location: WebElement | Point,
      offset?: Point
    ): ActionSequence;
    public mouseUp(
      elementOrButton?: WebElement | Button,
      button?: Button
    ): ActionSequence;
    public perform(): Promise<void>;
    public sendKeys(...args: string[]): ActionSequence;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html
  export class Builder {
    public build(): Promise<WebDriver>;
    public withCapabilities(capabilities: object): Builder;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html
  export class By {
    public static className(name: string): By;
    public static css(selector: string): By;
    public static id(id: string): By;
    public static linkText(text: string): By;
    public static name(name: string): By;
    public static partialLinkText(text: string): By;
    public static xpath(xpath: string): By;

    public using: string;
    public value: string;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Capabilities.html
  export class Capabilities {
    public static android(): Capabilities;
    public static chrome(): Capabilities;
    public static edge(): Capabilities;
    public static firefox(): Capabilities;
    public static htmlunit(): Capabilities;
    public static htmlunitwithjs(): Capabilities;
    public static ie(): Capabilities;
    public static ipad(): Capabilities;
    public static iphone(): Capabilities;
    public static opera(): Capabilities;
    public static phantomjs(): Capabilities;
    public static safari(): Capabilities;

    public set(key: string, value: any): Capabilities;
    public setAlertBehavior(
      behavior: 'accept' | 'dismiss' | 'ignore'
    ): Capabilities;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Condition.html
  export class Condition<T> {
    public fn(driver: WebDriver): T | null;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/actions_exports_TouchSequence.html
  export class TouchSequence {
    public doubleTap(elem: WebElement): TouchSequence;
    public flick(speed: Speed): TouchSequence;
    public flickElement(
      elem: WebElement,
      offset: Point,
      speed: number
    ): TouchSequence;
    public longPress(elem: WebElement): TouchSequence;
    public move(location: Point): TouchSequence;
    public perform(): Promise<void>;
    public release(location: Point): TouchSequence;
    public scroll(offset: Point): TouchSequence;
    public scrollFromElement(elem: WebElement, offset: Point): TouchSequence;
    public tap(elem: WebElement): TouchSequence;
    public tapAndHold(location: Point): TouchSequence;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
  export class WebDriver {
    public actions(): ActionSequence;
    public close(): Promise<void>;
    public executeAsyncScript<TValue>(
      script: string | ((...args: any[]) => void),
      ...args: any[]
    ): Promise<TValue>;
    public executeScript<TValue>(
      script: string | ((...args: any[]) => TValue),
      ...args: any[]
    ): Promise<TValue>;
    public findElement(locator: By): Promise<WebElement>;
    public findElements(locator: By): Promise<WebElement[]>;
    public get(url: string): Promise<void>;
    public getAllWindowHandles(): Promise<string[]>;
    public getCurrentUrl(): Promise<string>;
    public getTitle(): Promise<string>;
    public getWindowHandle(): Promise<string>;
    public manage(): Options;
    public navigate(): Navigation;
    public quit(): Promise<void>;
    public sleep(ms: number): Promise<string>;
    public switchTo(): TargetLocator;
    public takeScreenshot(): Promise<string>;
    public touchActions(): TouchSequence;
    public wait<T>(
      condition: Condition<T> | Promise<T | null>,
      timeout?: number,
      message?: string
    ): Promise<T | null>;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html
  export class WebElement {
    public clear(): Promise<void>;
    public click(): Promise<void>;
    public findElement(locator: By): Promise<WebElement>;
    public findElements(locator: By): Promise<WebElement[]>;
    public getAttribute(attributeName: string): Promise<string | null>;
    public getCssValue(cssStyleProperty: string): Promise<string>;
    public getDriver(): WebDriver;
    public getId(): Promise<string>;
    public getLocation(): Promise<Point>;
    public getSize(): Promise<Size>;
    public getTagName(): Promise<string>;
    public getText(): Promise<string>;
    public isDisplayed(): Promise<boolean>;
    public isEnabled(): Promise<boolean>;
    public isSelected(): Promise<boolean>;
    public sendKeys(...args: string[]): Promise<void>;
    public submit(): Promise<void>;
    public takeScreenshot(scroll?: boolean): Promise<string>;
  }

  // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html
  export const until: {
    ableToSwitchToFrame(frame: number | WebElement | By): Condition<boolean>;
    alertIsPresent(): Condition<Alert>;
    elementIsDisabled(element: WebElement): Condition<WebElement>;
    elementIsEnabled(element: WebElement): Condition<WebElement>;
    elementIsNotSelected(element: WebElement): Condition<WebElement>;
    elementIsNotVisible(element: WebElement): Condition<WebElement>;
    elementIsSelected(element: WebElement): Condition<WebElement>;
    elementIsVisible(element: WebElement): Condition<WebElement>;
    elementLocated(locator: By): Condition<WebElement>;
    elementTextContains(
      element: WebElement,
      substr: string
    ): Condition<WebElement>;
    elementTextIs(element: WebElement, text: string): Condition<WebElement>;
    elementTextMatches(
      element: WebElement,
      regex: RegExp
    ): Condition<WebElement>;
    elementsLocated(locator: By): Condition<WebElement[]>;
    stalenessOf(element: WebElement): Condition<boolean>;
    titleContains(substr: string): Condition<boolean>;
    titleIs(title: string): Condition<boolean>;
    titleMatches(regex: RegExp): Condition<boolean>;
    urlContains(substrUrl: string): Condition<boolean>;
    urlIs(url: string): Condition<boolean>;
    urlMatches(regex: RegExp): Condition<boolean>;
  };
}
