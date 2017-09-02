/// <reference path="../types/chrome-remote-interface.d.ts" />

import CDP = require('chrome-remote-interface');
import tempWrite = require('temp-write');

import {Loggable} from '@cybernaut/core/lib/Loggable';
import {Property} from '@cybernaut/core/lib/Property';
import {Action} from '@cybernaut/types/lib/Action';
import {format} from '@cybernaut/utils/lib/format';
import {LaunchedChrome, launch} from 'chrome-launcher';
import {MobileDevice} from './MobileDevice';

/* tslint:disable-next-line no-any */
export type Script<T = any> = (...args: any[]) => T;

export class Chrome extends Loggable {
  /* istanbul ignore next */
  public static async launch(headless: boolean = true): Promise<Chrome> {
    const chromeProcess = await launch({
      chromeFlags: headless ? ['--headless', '--disable-gpu'] : []
    });

    const client = await CDP({port: chromeProcess.port});

    return new Chrome(headless, client, chromeProcess);
  }

  public readonly headless: boolean;

  private readonly client: CDP.Client;
  private readonly chromeProcess: LaunchedChrome;

  public constructor(
    headless: boolean,
    client: CDP.Client,
    chromeProcess: LaunchedChrome
  ) {
    super(`Chrome.launch(${format(headless)})`, [
      'client',
      'chromeProcess',
      'evaluate',
      'then'
    ]);

    this.headless = headless;
    this.client = client;
    this.chromeProcess = chromeProcess;
  }

  public get pageTitle(): Property {
    /* istanbul ignore next */
    const script = () => document.title;

    return new Property(this.log, async () => this.evaluate(script));
  }

  public get pageUrl(): Property {
    /* istanbul ignore next */
    const script = () => window.location.href;

    return new Property(this.log, async () => this.evaluate(script));
  }

  /* tslint:disable-next-line no-any */
  public scriptResult(script: Script, ...args: any[]): Property {
    return new Property(this.log, async () => this.evaluate(script, ...args));
  }

  public navigateTo(
    url: string,
    waitUntilLoaded: boolean = false
  ): Action<void> {
    return {
      description: this.log,
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
      description: this.log,
      implementation: async () => this.evaluate<T>(script, ...args)
    };
  }

  public emulateMobileDevice(
    mobileDevice: MobileDevice,
    fitWindow: boolean = false
  ): Action<void> {
    return {
      description: this.log,
      implementation: async () => {
        const {Emulation, Network} = this.client;

        await Emulation.setDeviceMetricsOverride({
          width: mobileDevice.width,
          height: mobileDevice.height,
          deviceScaleFactor: mobileDevice.pixelRatio,
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

  public captureScreenshot(
    writeToFile: boolean = process.env.CI !== 'true'
  ): Action<string> {
    return {
      description: this.log,
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
