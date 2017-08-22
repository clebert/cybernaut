import {Describable} from '@cybernaut/core/lib/Describable';
import {StringProperty} from '@cybernaut/core/lib/StringProperty';
import {Action} from '@cybernaut/types/lib/Action';
import {getOption} from '@cybernaut/utils/lib/getOption';
import {Chromeless} from 'chromeless';

export interface ChromeOptions {
  readonly chromeless: Chromeless<any>; // tslint:disable-line no-any
  readonly noScreenshot: boolean;
}

export class Chrome extends Describable {
  // tslint:disable-next-line no-any
  private chromeless: Chromeless<any>;

  private readonly noScreenshot: boolean;

  // tslint:disable-next-line no-any
  public constructor(options?: Partial<ChromeOptions>) {
    super('chrome');

    this.chromeless = getOption(options, 'chromeless', new Chromeless());
    this.noScreenshot = getOption(options, 'noScreenshot', false);
  }

  public get pageTitle(): StringProperty {
    return new StringProperty(this.description, async () =>
      this.evaluateScript(() => document.title)
    );
  }

  public get pageUrl(): StringProperty {
    return new StringProperty(this.description, async () =>
      this.evaluateScript(() => window.location.href)
    );
  }

  public loadPage(url: string): Action<string | undefined> {
    return {
      description: this.describeMethodCall(...arguments),
      implementation: async () => {
        this.chromeless.goto(url);

        return this.maybeTakeScreenshot();
      }
    };
  }

  public async quit(): Promise<void> {
    await this.chromeless.end();
  }

  private async evaluateScript<T>(script: () => T): Promise<T> {
    return (this.chromeless = this.chromeless.evaluate<T>(script));
  }

  private async maybeTakeScreenshot(): Promise<string | undefined> {
    return (this.chromeless = this.noScreenshot
      ? this.chromeless.evaluate<undefined>(() => undefined)
      : this.chromeless.screenshot());
  }
}
