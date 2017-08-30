export interface MobileDevice {
  readonly width: number;
  readonly height: number;
  readonly pixelRatio: number;
  readonly userAgent: string;
}

interface Size {
  readonly width: number;
  readonly height: number;
}

const iPhoneUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

function getSize(
  horizontal: boolean,
  horizontalWidth: number,
  horizontalHeight: number
): Size {
  return {
    width: horizontal ? horizontalWidth : horizontalHeight,
    height: horizontal ? horizontalHeight : horizontalWidth
  };
}

export function iPhone4(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 480, 320),
    pixelRatio: 2,
    userAgent: iPhoneUserAgent
  };
}

export function iPhone5(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 568, 320),
    pixelRatio: 2,
    userAgent: iPhoneUserAgent
  };
}

export function iPhone6(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 667, 375),
    pixelRatio: 2,
    userAgent: iPhoneUserAgent
  };
}

export function iPhone6Plus(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 736, 414),
    pixelRatio: 3,
    userAgent: iPhoneUserAgent
  };
}
