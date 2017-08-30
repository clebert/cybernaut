import {iPhone4, iPhone5, iPhone6, iPhone6Plus} from '../MobileDevice';

const iPhoneUserAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

describe('iPhone4()', () => {
  it('should return a vertical iPhone 4', async () => {
    const mobileDevice = iPhone4();

    expect(mobileDevice).toEqual({
      width: 320,
      height: 480,
      scaleFactor: 2,
      userAgent: iPhoneUserAgent
    });
  });

  it('should return a horizontal iPhone 4', async () => {
    const mobileDevice = iPhone4(true);

    expect(mobileDevice).toEqual({
      width: 480,
      height: 320,
      scaleFactor: 2,
      userAgent: iPhoneUserAgent
    });
  });
});

describe('iPhone5()', () => {
  it('should return a vertical iPhone 5', async () => {
    const mobileDevice = iPhone5();

    expect(mobileDevice).toEqual({
      width: 320,
      height: 568,
      scaleFactor: 2,
      userAgent: iPhoneUserAgent
    });
  });

  it('should return a horizontal iPhone 5', async () => {
    const mobileDevice = iPhone5(true);

    expect(mobileDevice).toEqual({
      width: 568,
      height: 320,
      scaleFactor: 2,
      userAgent: iPhoneUserAgent
    });
  });
});

describe('iPhone6()', () => {
  it('should return a vertical iPhone 6', async () => {
    const mobileDevice = iPhone6();

    expect(mobileDevice).toEqual({
      width: 375,
      height: 667,
      scaleFactor: 2,
      userAgent: iPhoneUserAgent
    });
  });

  it('should return a horizontal iPhone 6', async () => {
    const mobileDevice = iPhone6(true);

    expect(mobileDevice).toEqual({
      width: 667,
      height: 375,
      scaleFactor: 2,
      userAgent: iPhoneUserAgent
    });
  });
});

describe('iPhone6Plus()', () => {
  it('should return a vertical iPhone 6 Plus', async () => {
    const mobileDevice = iPhone6Plus();

    expect(mobileDevice).toEqual({
      width: 414,
      height: 736,
      scaleFactor: 3,
      userAgent: iPhoneUserAgent
    });
  });

  it('should return a horizontal iPhone 6 Plus', async () => {
    const mobileDevice = iPhone6Plus(true);

    expect(mobileDevice).toEqual({
      width: 736,
      height: 414,
      scaleFactor: 3,
      userAgent: iPhoneUserAgent
    });
  });
});
