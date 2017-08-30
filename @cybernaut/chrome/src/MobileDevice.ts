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

const chromeVersion = '60.0.3112.113';

const userAgents = {
  iPad:
    'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  iPhone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
  Nexus4: `Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Mobile Safari/537.36`,
  Nexus5: `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Mobile Safari/537.36`,
  Nexus6: `Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Mobile Safari/537.36`,
  Nexus7: `Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`,
  Nexus10: `Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`
};

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

/* Source: https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/emulated_devices/module.json */

export function iPadMini(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 1024, 768),
    pixelRatio: 2,
    userAgent: userAgents.iPad
  };
}

export function iPad(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 1024, 768),
    pixelRatio: 2,
    userAgent: userAgents.iPad
  };
}

export function iPadPro(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 1366, 1024),
    pixelRatio: 2,
    userAgent: userAgents.iPad
  };
}

export function iPhone4(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 480, 320),
    pixelRatio: 2,
    userAgent: userAgents.iPhone
  };
}

export function iPhone5(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 568, 320),
    pixelRatio: 2,
    userAgent: userAgents.iPhone
  };
}

export function iPhone6(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 667, 375),
    pixelRatio: 2,
    userAgent: userAgents.iPhone
  };
}

export function iPhone6Plus(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 736, 414),
    pixelRatio: 3,
    userAgent: userAgents.iPhone
  };
}

export function Nexus4(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 640, 384),
    pixelRatio: 2,
    userAgent: userAgents.Nexus4
  };
}

export function Nexus5(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 640, 360),
    pixelRatio: 3,
    userAgent: userAgents.Nexus5
  };
}

export function Nexus5X(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 732, 412),
    pixelRatio: 2.625,
    userAgent: userAgents.Nexus5
  };
}

export function Nexus6(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 732, 412),
    pixelRatio: 3.5,
    userAgent: userAgents.Nexus6
  };
}

export function Nexus6P(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 732, 412),
    pixelRatio: 3.5,
    userAgent: userAgents.Nexus6
  };
}

export function Nexus7(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 960, 600),
    pixelRatio: 2,
    userAgent: userAgents.Nexus7
  };
}

export function Nexus10(horizontal: boolean = false): MobileDevice {
  return {
    ...getSize(horizontal, 1280, 800),
    pixelRatio: 2,
    userAgent: userAgents.Nexus10
  };
}
