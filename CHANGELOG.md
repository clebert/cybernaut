# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][external-keepachangelog]
and this project adheres to [Semantic Versioning][external-semver-spec].

## [Unreleased]

### Added

### Changed

### Fixed

## v15.1.0 - 2017-09-19

### Added

#### @cybernaut/puppeteer

- Added the `takeScreenshot()` function.

## v15.0.0 - 2017-09-17

### Added

- Added the `@cybernaut/puppeteer` package.
- Added the `@cybernaut/test` package.

### Changed

- **Breaking:** Removed the `@cybernaut/chrome` package.
- **Breaking:** Removed the `@cybernaut/core` package.
- **Breaking:** Removed the `@cybernaut/engine` package.
- **Breaking:** Removed the `@cybernaut/mocks` package.
- **Breaking:** Removed the `@cybernaut/types` package.
- **Breaking:** Removed the `@cybernaut/utils` package.

## v14.1.0 - 2017-09-05

### Added

#### @cybernaut/chrome

- Added the `DOMNode` class.
- Added the `Chrome.rootNode` property.

## v14.0.0 - 2017-09-04

### Added

#### @cybernaut/utils

- Added the `getRecording()` function.
- Added the `recordable()` function/decorator.

### Changed

#### @cybernaut/core

- **Breaking:** Removed the `Loggable` class.

## v13.0.0 - 2017-09-02

### Added

#### @cybernaut/chrome

- Added the `Chrome.headless` property.

### Changed

#### @cybernaut/engine

- **Breaking:** Changed the parameters of the `Engine()` constructor.
- **Breaking:** Removed the `EngineOptions` interface.

#### @cybernaut/chrome

- **Breaking:** Changed the default value of the `headless` parameter of the `Chrome.launch()` static method.
- **Breaking:** Changed the default value of the `writeToFile` parameter of the `Chrome.captureScreenshot()` method.
- **Breaking:** Changed the default value of the `fitWindow` parameter of the `Chrome.emulateMobileDevice()` method.

#### @cybernaut/utils

- **Breaking:** Removed the `getOption()` function.

## v12.0.0 - 2017-09-02

### Added

#### @cybernaut/engine

- Added the `Engine.retries` and `Engine.retryDelay` properties.

#### @cybernaut/chrome

- Added the `Chrome.runScript()` and `Chrome.scriptResult()` methods.
- Added the `MobileDevice` interface.
- Added the `iPadMini()`, `iPad()`, `iPadPro()`, `iPhone4()`, `iPhone5()`, `iPhone6()`, `iPhone6Plus()`, `Nexus4()`, `Nexus5()`, `Nexus5X()`, `Nexus6()`, `Nexus6P()`, `Nexus7()`, and `Nexus10()` factory functions.

#### @cybernaut/core

- Added the `Loggable` class as a replacement for the `Describable` class.
- Added the `ConditionBuilder` class as a replacement for the `GenericConditionBuilder`, `NumberConditionBuilder`, and `StringConditionBuilder` classes.
- Added the `Property` class as a replacement for the `GenericProperty`, `NumberProperty`, and `StringProperty` classes.

### Changed

#### @cybernaut/engine

- Removed some generic type declarations from the `Engine` class.

#### @cybernaut/chrome

- **Breaking:** Changed the parameters of the `Chrome.launch()` static method.
- **Breaking:** Renamed the `Chrome.navigate()` method to `Chrome.navigateTo()`.
- **Breaking:** Renamed the `Chrome.emulateDevice()` method to `Chrome.emulateMobileDevice()`.
- **Breaking:** Removed the `Chrome.launchHeadless()` static method.
- **Breaking:** Removed the `ChromeOptions` interface.
- **Breaking:** Removed the `Device` class.

#### @cybernaut/core

- **Breaking:** Removed the `Describable`, `GenericConditionBuilder`, `NumberConditionBuilder`, `StringConditionBuilder`, `GenericProperty`, `NumberProperty`, and `StringProperty` classes.

#### @cybernaut/mocks

- Removed some generic type declarations from the `MockCondition` class.

#### @cybernaut/types

- Removed some generic type declarations from the `Accessor` interface.
- Removed some generic type declarations from the `Condition` interface.
- Removed some generic type declarations from the `Predicate` interface.

[external-keepachangelog]: http://keepachangelog.com/en/1.0.0/
[external-semver-spec]: http://semver.org/spec/v2.0.0.html
