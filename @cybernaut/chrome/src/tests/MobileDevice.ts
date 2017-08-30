import {
  Nexus10,
  Nexus4,
  Nexus5,
  Nexus5X,
  Nexus6,
  Nexus6P,
  Nexus7,
  iPad,
  iPadMini,
  iPadPro,
  iPhone4,
  iPhone5,
  iPhone6,
  iPhone6Plus
} from '../MobileDevice';

describe('iPadMini()', () => {
  it('should return a vertical iPad Mini', async () => {
    const mobileDevice = iPadMini();

    expect(mobileDevice.width).toBe(768);
    expect(mobileDevice.height).toBe(1024);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPad/);
  });

  it('should return a horizontal iPad Mini', async () => {
    const mobileDevice = iPadMini(true);

    expect(mobileDevice.width).toBe(1024);
    expect(mobileDevice.height).toBe(768);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPad/);
  });
});

describe('iPad()', () => {
  it('should return a vertical iPad', async () => {
    const mobileDevice = iPad();

    expect(mobileDevice.width).toBe(768);
    expect(mobileDevice.height).toBe(1024);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPad/);
  });

  it('should return a horizontal iPad', async () => {
    const mobileDevice = iPad(true);

    expect(mobileDevice.width).toBe(1024);
    expect(mobileDevice.height).toBe(768);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPad/);
  });
});

describe('iPadPro()', () => {
  it('should return a vertical iPad Pro', async () => {
    const mobileDevice = iPadPro();

    expect(mobileDevice.width).toBe(1024);
    expect(mobileDevice.height).toBe(1366);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPad/);
  });

  it('should return a horizontal iPad Pro', async () => {
    const mobileDevice = iPadPro(true);

    expect(mobileDevice.width).toBe(1366);
    expect(mobileDevice.height).toBe(1024);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPad/);
  });
});

describe('iPhone4()', () => {
  it('should return a vertical iPhone 4', async () => {
    const mobileDevice = iPhone4();

    expect(mobileDevice.width).toBe(320);
    expect(mobileDevice.height).toBe(480);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });

  it('should return a horizontal iPhone 4', async () => {
    const mobileDevice = iPhone4(true);

    expect(mobileDevice.width).toBe(480);
    expect(mobileDevice.height).toBe(320);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });
});

describe('iPhone5()', () => {
  it('should return a vertical iPhone 5', async () => {
    const mobileDevice = iPhone5();

    expect(mobileDevice.width).toBe(320);
    expect(mobileDevice.height).toBe(568);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });

  it('should return a horizontal iPhone 5', async () => {
    const mobileDevice = iPhone5(true);

    expect(mobileDevice.width).toBe(568);
    expect(mobileDevice.height).toBe(320);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });
});

describe('iPhone6()', () => {
  it('should return a vertical iPhone 6', async () => {
    const mobileDevice = iPhone6();

    expect(mobileDevice.width).toBe(375);
    expect(mobileDevice.height).toBe(667);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });

  it('should return a horizontal iPhone 6', async () => {
    const mobileDevice = iPhone6(true);

    expect(mobileDevice.width).toBe(667);
    expect(mobileDevice.height).toBe(375);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });
});

describe('iPhone6Plus()', () => {
  it('should return a vertical iPhone 6 Plus', async () => {
    const mobileDevice = iPhone6Plus();

    expect(mobileDevice.width).toBe(414);
    expect(mobileDevice.height).toBe(736);
    expect(mobileDevice.pixelRatio).toBe(3);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });

  it('should return a horizontal iPhone 6 Plus', async () => {
    const mobileDevice = iPhone6Plus(true);

    expect(mobileDevice.width).toBe(736);
    expect(mobileDevice.height).toBe(414);
    expect(mobileDevice.pixelRatio).toBe(3);
    expect(mobileDevice.userAgent).toMatch(/iPhone/);
  });
});

describe('Nexus4()', () => {
  it('should return a vertical Nexus 4', async () => {
    const mobileDevice = Nexus4();

    expect(mobileDevice.width).toBe(384);
    expect(mobileDevice.height).toBe(640);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/Nexus 4/);
  });

  it('should return a horizontal Nexus 4', async () => {
    const mobileDevice = Nexus4(true);

    expect(mobileDevice.width).toBe(640);
    expect(mobileDevice.height).toBe(384);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/Nexus 4/);
  });
});

describe('Nexus5()', () => {
  it('should return a vertical Nexus 5', async () => {
    const mobileDevice = Nexus5();

    expect(mobileDevice.width).toBe(360);
    expect(mobileDevice.height).toBe(640);
    expect(mobileDevice.pixelRatio).toBe(3);
    expect(mobileDevice.userAgent).toMatch(/Nexus 5/);
  });

  it('should return a horizontal Nexus 5', async () => {
    const mobileDevice = Nexus5(true);

    expect(mobileDevice.width).toBe(640);
    expect(mobileDevice.height).toBe(360);
    expect(mobileDevice.pixelRatio).toBe(3);
    expect(mobileDevice.userAgent).toMatch(/Nexus 5/);
  });
});

describe('Nexus5X()', () => {
  it('should return a vertical Nexus 5X', async () => {
    const mobileDevice = Nexus5X();

    expect(mobileDevice.width).toBe(412);
    expect(mobileDevice.height).toBe(732);
    expect(mobileDevice.pixelRatio).toBe(2.625);
    expect(mobileDevice.userAgent).toMatch(/Nexus 5/);
  });

  it('should return a horizontal Nexus 5X', async () => {
    const mobileDevice = Nexus5X(true);

    expect(mobileDevice.width).toBe(732);
    expect(mobileDevice.height).toBe(412);
    expect(mobileDevice.pixelRatio).toBe(2.625);
    expect(mobileDevice.userAgent).toMatch(/Nexus 5/);
  });
});

describe('Nexus6()', () => {
  it('should return a vertical Nexus 6', async () => {
    const mobileDevice = Nexus6();

    expect(mobileDevice.width).toBe(412);
    expect(mobileDevice.height).toBe(732);
    expect(mobileDevice.pixelRatio).toBe(3.5);
    expect(mobileDevice.userAgent).toMatch(/Nexus 6/);
  });

  it('should return a horizontal Nexus 6', async () => {
    const mobileDevice = Nexus6(true);

    expect(mobileDevice.width).toBe(732);
    expect(mobileDevice.height).toBe(412);
    expect(mobileDevice.pixelRatio).toBe(3.5);
    expect(mobileDevice.userAgent).toMatch(/Nexus 6/);
  });
});

describe('Nexus6P()', () => {
  it('should return a vertical Nexus 6P', async () => {
    const mobileDevice = Nexus6P();

    expect(mobileDevice.width).toBe(412);
    expect(mobileDevice.height).toBe(732);
    expect(mobileDevice.pixelRatio).toBe(3.5);
    expect(mobileDevice.userAgent).toMatch(/Nexus 6/);
  });

  it('should return a horizontal Nexus 6P', async () => {
    const mobileDevice = Nexus6P(true);

    expect(mobileDevice.width).toBe(732);
    expect(mobileDevice.height).toBe(412);
    expect(mobileDevice.pixelRatio).toBe(3.5);
    expect(mobileDevice.userAgent).toMatch(/Nexus 6/);
  });
});

describe('Nexus7()', () => {
  it('should return a vertical Nexus 7', async () => {
    const mobileDevice = Nexus7();

    expect(mobileDevice.width).toBe(600);
    expect(mobileDevice.height).toBe(960);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/Nexus 7/);
  });

  it('should return a horizontal Nexus 7', async () => {
    const mobileDevice = Nexus7(true);

    expect(mobileDevice.width).toBe(960);
    expect(mobileDevice.height).toBe(600);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/Nexus 7/);
  });
});

describe('Nexus10()', () => {
  it('should return a vertical Nexus 10', async () => {
    const mobileDevice = Nexus10();

    expect(mobileDevice.width).toBe(800);
    expect(mobileDevice.height).toBe(1280);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/Nexus 10/);
  });

  it('should return a horizontal Nexus 10', async () => {
    const mobileDevice = Nexus10(true);

    expect(mobileDevice.width).toBe(1280);
    expect(mobileDevice.height).toBe(800);
    expect(mobileDevice.pixelRatio).toBe(2);
    expect(mobileDevice.userAgent).toMatch(/Nexus 10/);
  });
});
