/* https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/emulated_devices/module.json */

import {Device} from '../Device';

describe('Device.constructor()', () => {
  it('should return a device with default options', async () => {
    const device = new Device(640, 480, 'an user agent');

    expect(device).toEqual({
      width: 640,
      height: 480,
      userAgent: 'an user agent',
      scaleFactor: 0,
      mobile: false,
      touch: false
    });
  });

  it('should return a device with custom options', async () => {
    const device = new Device(640, 480, 'an user agent', {
      scaleFactor: 1,
      mobile: true,
      touch: true
    });

    expect(device).toEqual({
      width: 640,
      height: 480,
      userAgent: 'an user agent',
      scaleFactor: 1,
      mobile: true,
      touch: true
    });
  });
});

const iPhoneUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

describe('Device.iPhone4()', () => {
  it('should return a vertical device', async () => {
    const device = Device.iPhone4();

    expect(device).toEqual({
      width: 320,
      height: 480,
      userAgent: iPhoneUserAgent,
      scaleFactor: 2,
      mobile: true,
      touch: true
    });
  });

  it('should return a horizontal device', async () => {
    const device = Device.iPhone4(true);

    expect(device).toEqual({
      width: 480,
      height: 320,
      userAgent: iPhoneUserAgent,
      scaleFactor: 2,
      mobile: true,
      touch: true
    });
  });
});

describe('Device.iPhone5()', () => {
  it('should return a vertical device', async () => {
    const device = Device.iPhone5();

    expect(device).toEqual({
      width: 320,
      height: 568,
      userAgent: iPhoneUserAgent,
      scaleFactor: 2,
      mobile: true,
      touch: true
    });
  });

  it('should return a horizontal device', async () => {
    const device = Device.iPhone5(true);

    expect(device).toEqual({
      width: 568,
      height: 320,
      userAgent: iPhoneUserAgent,
      scaleFactor: 2,
      mobile: true,
      touch: true
    });
  });
});

describe('Device.iPhone6()', () => {
  it('should return a vertical device', async () => {
    const device = Device.iPhone6();

    expect(device).toEqual({
      width: 375,
      height: 667,
      userAgent: iPhoneUserAgent,
      scaleFactor: 2,
      mobile: true,
      touch: true
    });
  });

  it('should return a horizontal device', async () => {
    const device = Device.iPhone6(true);

    expect(device).toEqual({
      width: 667,
      height: 375,
      userAgent: iPhoneUserAgent,
      scaleFactor: 2,
      mobile: true,
      touch: true
    });
  });
});

describe('Device.iPhone6Plus()', () => {
  it('should return a vertical device', async () => {
    const device = Device.iPhone6Plus();

    expect(device).toEqual({
      width: 414,
      height: 736,
      userAgent: iPhoneUserAgent,
      scaleFactor: 3,
      mobile: true,
      touch: true
    });
  });

  it('should return a horizontal device', async () => {
    const device = Device.iPhone6Plus(true);

    expect(device).toEqual({
      width: 736,
      height: 414,
      userAgent: iPhoneUserAgent,
      scaleFactor: 3,
      mobile: true,
      touch: true
    });
  });
});
