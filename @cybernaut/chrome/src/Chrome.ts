/// <reference path="../types/chrome-remote-interface.d.ts" />

import CDP = require('chrome-remote-interface');
import tempWrite = require('temp-write');

import {Describable} from '@cybernaut/core/lib/Describable';
import {Property} from '@cybernaut/core/lib/Property';
import {Action} from '@cybernaut/types/lib/Action';
import {getOption} from '@cybernaut/utils/lib/getOption';
import {LaunchedChrome, launch} from 'chrome-launcher';
import {MobileDevice} from './MobileDevice';

/* tslint:disable-next-line no-any */
export type Script<T = any> = (...args: any[]) => T;

export interface ChromeOptions {
  readonly chromeFlags: string[];
  readonly chromePath: string;
}

export class Chrome extends Describable {
  public static async launch(
    options?: Partial<ChromeOptions>
  ): Promise<Chrome> {
    const chromeProcess = await launch(options);
    const client = await CDP({port: chromeProcess.port});

    return new Chrome(client, chromeProcess);
  }

  public static async launchHeadless(
    options?: Partial<ChromeOptions>
  ): Promise<Chrome> {
    const chromeFlags = [
      ...getOption(options, 'chromeFlags', []),
      '--headless',
      '--disable-gpu'
    ];

    return Chrome.launch({...options, chromeFlags});
  }

  private readonly client: CDP.Client;
  private readonly chromeProcess: LaunchedChrome;

  public constructor(client: CDP.Client, chromeProcess: LaunchedChrome) {
    super('chrome');

    this.client = client;
    this.chromeProcess = chromeProcess;
  }

  public get pageTitle(): Property {
    /* istanbul ignore next */
    const script = () => document.title;

    return new Property(this.description, async () => this.evaluate(script));
  }

  public get pageUrl(): Property {
    /* istanbul ignore next */
    const script = () => window.location.href;

    return new Property(this.description, async () => this.evaluate(script));
  }

  /* tslint:disable-next-line no-any */
  public scriptResult(script: Script, ...args: any[]): Property {
    const description = this.describeMethodCall(...arguments);

    return new Property(description, async () =>
      this.evaluate(script, ...args)
    );
  }

  public emulateMobileDevice(
    mobileDevice: MobileDevice,
    fitWindow: boolean = false
  ): Action<void> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        const {Emulation, Network} = this.client;

        await Emulation.setDeviceMetricsOverride({
          width: mobileDevice.width,
          height: mobileDevice.height,
          deviceScaleFactor: mobileDevice.scaleFactor,
          mobile: true,
          fitWindow,
          screenWidth: mobileDevice.width,
          screenHeight: mobileDevice.height,
          dontSetVisibleSize: false
        });

        await Emulation.setTouchEmulationEnabled({enabled: true});

        await Network.enable();

        await Network.setUserAgentOverride({
          userAgent: mobileDevice.userAgent
        });
      }
    };
  }

  public navigateTo(
    url: string,
    waitUntilLoaded: boolean = false
  ): Action<void> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        const {Page} = this.client;

        await Page.enable();
        await Page.navigate({url});

        if (waitUntilLoaded) {
          await Page.loadEventFired();
        }
      }
    };
  }

  /* tslint:disable-next-line no-any */
  public runScript<T>(script: Script<T>, ...args: any[]): Action<T> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => this.evaluate<T>(script, ...args)
    };
  }

  public captureScreenshot(writeToFile: boolean = false): Action<string> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        const screenshot = await this.client.Page.captureScreenshot({
          fromSurface: true
        });

        if (!writeToFile) {
          return screenshot.data;
        }

        return tempWrite(
          new Buffer(screenshot.data, 'base64'),
          'screenshot.png'
        );
      }
    };
  }

  public async quit(): Promise<void> {
    await this.client.close();
    await this.chromeProcess.kill();
  }

  /* tslint:disable-next-line no-any */
  private async evaluate<T>(script: Script, ...args: any[]): Promise<T> {
    const expression = `(${script.toString()})(${args
      .map(arg => JSON.stringify(arg))
      .join(', ')})`;

    const {result} = await this.client.Runtime.evaluate({expression});
    const {description, subtype, type} = result;

    if (type === 'object' && subtype === 'error') {
      /* istanbul ignore next */
      const execArray = description ? /: (.*)/.exec(description) : null;

      throw new Error(execArray ? execArray[1] : 'Unknown error');
    }

    return result.value;
  }
}
