import {getOption} from '@cybernaut/utils/lib/getOption';

export interface DeviceOptions {
  readonly scaleFactor: number;
  readonly mobile: boolean;
  readonly touch: boolean;
}

const iPhoneUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

export class Device {
  public static iPhone4(horizontal: boolean = false): Device {
    const horizontalWidth = 480;
    const horizontalHeight = 320;

    return new Device(
      horizontal ? horizontalWidth : horizontalHeight,
      horizontal ? horizontalHeight : horizontalWidth,
      iPhoneUserAgent,
      {mobile: true, scaleFactor: 2, touch: true}
    );
  }

  public static iPhone5(horizontal: boolean = false): Device {
    const horizontalWidth = 568;
    const horizontalHeight = 320;

    return new Device(
      horizontal ? horizontalWidth : horizontalHeight,
      horizontal ? horizontalHeight : horizontalWidth,
      iPhoneUserAgent,
      {mobile: true, scaleFactor: 2, touch: true}
    );
  }

  public static iPhone6(horizontal: boolean = false): Device {
    const horizontalWidth = 667;
    const horizontalHeight = 375;

    return new Device(
      horizontal ? horizontalWidth : horizontalHeight,
      horizontal ? horizontalHeight : horizontalWidth,
      iPhoneUserAgent,
      {mobile: true, scaleFactor: 2, touch: true}
    );
  }

  public static iPhone6Plus(horizontal: boolean = false): Device {
    const horizontalWidth = 736;
    const horizontalHeight = 414;

    return new Device(
      horizontal ? horizontalWidth : horizontalHeight,
      horizontal ? horizontalHeight : horizontalWidth,
      iPhoneUserAgent,
      {mobile: true, scaleFactor: 3, touch: true}
    );
  }

  public readonly width: number;
  public readonly height: number;
  public readonly userAgent: string;
  public readonly scaleFactor: number;
  public readonly mobile: boolean;
  public readonly touch: boolean;

  public constructor(
    width: number,
    height: number,
    userAgent: string,
    options?: Partial<DeviceOptions>
  ) {
    this.width = width;
    this.height = height;
    this.userAgent = userAgent;
    this.scaleFactor = getOption(options, 'scaleFactor', 0);
    this.mobile = getOption(options, 'mobile', false);
    this.touch = getOption(options, 'touch', false);
  }
}
