/// <reference path="../types/chrome-remote-interface.d.ts" />

import CDP = require('chrome-remote-interface');
import tempWrite = require('temp-write');

import {Describable} from '@cybernaut/core/lib/Describable';
import {StringProperty} from '@cybernaut/core/lib/StringProperty';
import {Action} from '@cybernaut/types/lib/Action';
import {getOption} from '@cybernaut/utils/lib/getOption';
import {LaunchedChrome, launch} from 'chrome-launcher';

export interface ChromeOptions {
  readonly chromeFlags: string[];
  readonly chromePath: string;
  readonly enableExtensions: boolean;
}

export class Chrome extends Describable {
  public static async connect(options?: CDP.Options): Promise<Chrome> {
    const client = await CDP(options);

    return new Chrome(client);
  }

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

  private readonly chromeProcess?: LaunchedChrome;
  private readonly client: CDP.Client;

  public constructor(client: CDP.Client, chromeProcess?: LaunchedChrome) {
    super('chrome');

    this.chromeProcess = chromeProcess;
    this.client = client;
  }

  public get pageTitle(): StringProperty {
    return new StringProperty(this.description, async () =>
      this.run(() => document.title)
    );
  }

  public get pageUrl(): StringProperty {
    return new StringProperty(this.description, async () =>
      this.run(() => window.location.href)
    );
  }

  public loadPage(url: string): Action<void> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        const {Page} = this.client;

        await Page.enable();
        await Page.navigate({url});
        await Page.loadEventFired();
      }
    };
  }

  public captureScreenshot(): Action<string> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        const screenshot = await this.client.Page.captureScreenshot();

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

  // tslint:disable-next-line no-any
  private async run<T>(script: () => T): Promise<T> {
    const expression = `(${script.toString()})()`;
    const {result} = await this.client.Runtime.evaluate({expression});
    const {className, description, subtype, type} = result;

    if (type === 'object' && subtype === 'error') {
      const execArray = description ? /: (.*)/.exec(description) : null;
      const message = execArray ? execArray[1] : undefined;

      if (className) {
        // tslint:disable-next-line no-any
        throw new (global as any)[className](message);
      } else {
        throw new Error(message);
      }
    }

    return result.value;
  }
}
