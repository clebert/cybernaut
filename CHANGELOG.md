# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][external-keepachangelog]
and this project adheres to [Semantic Versioning][external-semver-spec].

## [Unreleased]

### Added

### Changed

### Fixed

## v14.0.0 - 2017-09-04

### Added

#### @cybernaut/utils

- Added the function `getRecording()`.
- Added the function/decorator `recordable()`.

### Changed

#### @cybernaut/core

- **Breaking:** Removed the class `Loggable`.

## v13.0.0 - 2017-09-02

### Added

#### @cybernaut/chrome

- Added the property `Chrome.headless`.

### Changed

#### @cybernaut/engine

- **Breaking:** Changed the parameters of the constructor `Engine()`.
- **Breaking:** Removed the interface `EngineOptions`.

#### @cybernaut/chrome

- **Breaking:** Changed the default value of the parameter `headless` of the static method `Chrome.launch()`.
- **Breaking:** Changed the default value of the parameter `writeToFile` of the method `Chrome.captureScreenshot()`.
- **Breaking:** Changed the default value of the parameter `fitWindow` of the method `Chrome.emulateMobileDevice()`.

#### @cybernaut/utils

- **Breaking:** Removed the function `getOption()`.

## v12.0.0 - 2017-09-02

### Added

#### @cybernaut/engine

- Added the properties `Engine.retries` and `Engine.retryDelay`.

#### @cybernaut/chrome

- Added the methods `Chrome.runScript()` and `Chrome.scriptResult()`.
- Added the interface `MobileDevice`.
- Added the factory functions `iPadMini()`, `iPad()`, `iPadPro()`, `iPhone4()`, `iPhone5()`, `iPhone6()`, `iPhone6Plus()`, `Nexus4()`, `Nexus5()`, `Nexus5X()`, `Nexus6()`, `Nexus6P()`, `Nexus7()`, and `Nexus10()`.

#### @cybernaut/core

- Added the class `Loggable` as a replacement for the class `Describable`.
- Added the class `ConditionBuilder` as a replacement for the classes `GenericConditionBuilder`, `NumberConditionBuilder`, and `StringConditionBuilder`.
- Added the class `Property` as a replacement for the classes `GenericProperty`, `NumberProperty`, and `StringProperty`.

### Changed

#### @cybernaut/engine

- Removed generic type declarations from the class `Engine`.

#### @cybernaut/chrome

- **Breaking:** Changed the parameters of the static method `Chrome.launch()`.
- **Breaking:** Renamed the method `Chrome.navigate()` to `Chrome.navigateTo()`.
- **Breaking:** Renamed the method `Chrome.emulateDevice()` to `Chrome.emulateMobileDevice()`.
- **Breaking:** Removed the static method `Chrome.launchHeadless()`.
- **Breaking:** Removed the interface `ChromeOptions`.
- **Breaking:** Removed the class `Device`.

#### @cybernaut/core

- **Breaking:** Removed the classes `Describable`, `GenericConditionBuilder`, `NumberConditionBuilder`, `StringConditionBuilder`, `GenericProperty`, `NumberProperty`, and `StringProperty`.

#### @cybernaut/mocks

- Removed generic type declarations from the class `MockCondition`.

#### @cybernaut/types

- Removed generic type declarations from the interface `Accessor`.
- Removed generic type declarations from the interface `Condition`.
- Removed generic type declarations from the interface `Predicate`.

[external-keepachangelog]: http://keepachangelog.com/en/1.0.0/
[external-semver-spec]: http://semver.org/spec/v2.0.0.html
