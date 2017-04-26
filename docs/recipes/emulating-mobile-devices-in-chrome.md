# Emulating mobile devices in Chrome

The provided ChromeDriver allows developers to emulate Chrome on a mobile device, by enabling the Mobile Emulation feature via the `mobileEmulation` capability. This feature speeds up web development, allows developers to quickly test how a website will render on a mobile device, without requiring a real device.

There are two ways in ChromeDriver to enable Mobile Emulation: by specifying a known device, or by specifying individual device attributes. The format of the `mobileEmulation` dictionary depends on which method is desired.

## Specifying a known mobile device

To enable Mobile Emulation with a specific device name, the `mobileEmulation` dictionary must contain a `deviceName`. Use a valid device name from the DevTools Emulation panel as the value for `deviceName`:

```json
{
  "capabilities": {
    "browserName": "chrome",
    "chromeOptions": {
      "mobileEmulation": {
        "deviceName": "Apple iPhone 6 Plus"
      }
    }
  }
}
```

## Specifying individual device attributes

It is also possible to enable Mobile Emulation by specifying individual attributes. To enable Mobile Emulation this way, the `mobileEmulation` dictionary can contain a `deviceMetrics` dictionary and a `userAgent` string. The following device metrics must be specified in the `deviceMetrics` dictionary:

* `width` - the width in pixels of the device's screen
* `height` - the height in pixels of the device's screen
* `pixelRatio` - the device's pixel ratio
* `touch` - whether to emulate touch events (defaults to true, usually does not need to be set)

```json
{
  "capabilities": {
    "browserName": "chrome",
    "chromeOptions": {
      "mobileEmulation": {
        "deviceMetrics": {
          "width": 360,
          "height": 640,
          "pixelRatio": 3.0
        },
        "userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
      }
    }
  }
}
```
