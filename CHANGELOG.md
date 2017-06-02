# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [9.0.0](https://github.com/clebert/cybernaut/compare/v8.0.0...v9.0.0) (2017-06-02)

### Bug Fixes

* Update ajv to version 5.1.5 ([#257](https://github.com/clebert/cybernaut/issues/257)) ([236bb82](https://github.com/clebert/cybernaut/commit/236bb82))
* Export `Predicate` type

### Features

* Rename types and restructure api ([#252](https://github.com/clebert/cybernaut/issues/252)) ([f24106b](https://github.com/clebert/cybernaut/commit/f24106b))

### BREAKING CHANGES

* Renamed types:
  * `Accessor` -> `SeleniumAccessor`
  * `Action` -> `SeleniumAction`
  * `Browser` -> `SeleniumBrowser`
  * `Config` -> `SeleniumConfig`
  * `Element` -> `SeleniumElement`
  * `Test` -> `SeleniumTestContext`
  * `Implementation` -> `SeleniumTest`

## [8.0.0](https://github.com/clebert/cybernaut/compare/v7.0.0...v8.0.0) (2017-05-29)

### Bug Fixes

* Update ajv to version 5.1.4 ([#237](https://github.com/clebert/cybernaut/issues/237)) ([6109544](https://github.com/clebert/cybernaut/commit/6109544))

### Features

* Make the configuration available at runtime ([#234](https://github.com/clebert/cybernaut/issues/234)) ([2d34fe1](https://github.com/clebert/cybernaut/commit/2d34fe1))
* Remove browser.sleep() and improve typings ([#240](https://github.com/clebert/cybernaut/issues/240)) ([04d9ed9](https://github.com/clebert/cybernaut/commit/04d9ed9))
* Remove browser.maximizeWindow() ([#239](https://github.com/clebert/cybernaut/issues/239)) ([6313b8d](https://github.com/clebert/cybernaut/commit/6313b8d))

### BREAKING CHANGES

* Remove browser.sleep()
* Improve typings for browser.scriptResult() and browser.executeScript()
* Remove browser.maximizeWindow()

## [7.0.0](https://github.com/clebert/cybernaut/compare/v6.2.0...v7.0.0) (2017-05-23)

### Features

* Improve documentation and docker containers ([69c3ae6](https://github.com/clebert/cybernaut/commit/69c3ae6))

### BREAKING CHANGES

* The paths within the docker containers for both the test directory (/opt/cybernaut-tests) and the configuration directory (/opt/cybernaut-config) have changed.

## [6.2.0](https://github.com/clebert/cybernaut/compare/v6.1.0...v6.2.0) (2017-05-21)

### Bug Fixes

* Update ajv to version 5.1.3 ([#222](https://github.com/clebert/cybernaut/issues/222)) ([1b584aa](https://github.com/clebert/cybernaut/commit/1b584aa))

### Features

* Add descendant elements and counting of elements ([#223](https://github.com/clebert/cybernaut/issues/223)) ([8f05043](https://github.com/clebert/cybernaut/commit/8f05043))

## [6.1.0](https://github.com/clebert/cybernaut/compare/v6.0.2...v6.1.0) (2017-05-19)

### Features

* Allow indexed access to an element ([#217](https://github.com/clebert/cybernaut/issues/217)) ([ad24833](https://github.com/clebert/cybernaut/commit/ad24833))

## [6.0.2](https://github.com/clebert/cybernaut/compare/v6.0.1...v6.0.2) (2017-05-18)

### Bug Fixes

* Update debug to version 2.6.8 ([#213](https://github.com/clebert/cybernaut/issues/213)) ([f8b75c3](https://github.com/clebert/cybernaut/commit/f8b75c3))
