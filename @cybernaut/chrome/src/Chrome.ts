/// <reference path="../types/chrome-remote-interface.d.ts" />

import CDP = require('chrome-remote-interface');
import tempWrite = require('temp-write');

import {Describable} from '@cybernaut/core/lib/Describable';
import {StringProperty} from '@cybernaut/core/lib/StringProperty';
import {Action} from '@cybernaut/types/lib/Action';
import {getOption} from '@cybernaut/utils/lib/getOption';
import {LaunchedChrome, launch} from 'chrome-launcher';
import {Device} from './Device';

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
  private readonly chromeProcess?: LaunchedChrome;

  public constructor(client: CDP.Client, chromeProcess?: LaunchedChrome) {
    super('chrome');

    this.client = client;
    this.chromeProcess = chromeProcess;
  }

  public get pageTitle(): StringProperty {
    /* istanbul ignore next */
    return new StringProperty(this.description, async () =>
      this.run(() => document.title)
    );
  }

  public get pageUrl(): StringProperty {
    /* istanbul ignore next */
    return new StringProperty(this.description, async () =>
      this.run(() => window.location.href)
    );
  }

  public emulateDevice(
    device: Device,
    fitWindow: boolean = false
  ): Action<void> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        const {Emulation, Network} = this.client;

        if ((await Emulation.canEmulate()).result) {
          await Emulation.setDeviceMetricsOverride({
            width: device.width,
            height: device.height,
            deviceScaleFactor: device.scaleFactor,
            mobile: device.mobile,
            fitWindow,
            screenWidth: device.width,
            screenHeight: device.height,
            dontSetVisibleSize: false
          });

          await Emulation.setTouchEmulationEnabled({enabled: device.touch});

          await Network.enable();
          await Network.setUserAgentOverride({userAgent: device.userAgent});
        }
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

    if (this.chromeProcess) {
      await this.chromeProcess.kill();
    }
  }

  /* tslint:disable-next-line no-any */
  private async run<T>(script: () => T): Promise<T> {
    const expression = `(${script.toString()})()`;
    const {result} = await this.client.Runtime.evaluate({expression});
    const {className, description, subtype, type} = result;

    if (type === 'object' && subtype === 'error') {
      const execArray = description ? /: (.*)/.exec(description) : null;
      const message = execArray ? execArray[1] : undefined;

      if (className) {
        /* tslint:disable-next-line no-any */
        throw new (global as any)[className](message);
      } else {
        throw new Error(message);
      }
    }

    return result.value;
  }
}
