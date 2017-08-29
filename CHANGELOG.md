# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][external-keepachangelog]
and this project adheres to [Semantic Versioning][external-semver-spec].

## [Unreleased]

### Added

- Added the method `runScript` to the class `@cybernaut/chrome/lib/Chrome`.
- Added the method `scriptResult` to the class `@cybernaut/chrome/lib/Chrome`.
- Added the class `@cybernaut/core/lib/ConditionBuilder` as a replacement for the classes `@cybernaut/core/lib/GenericConditionBuilder`, `@cybernaut/core/lib/NumberConditionBuilder`, and `@cybernaut/core/lib/StringConditionBuilder`.
- Added the class `@cybernaut/core/lib/Property` as a replacement for the classes `@cybernaut/core/lib/GenericProperty`, `@cybernaut/core/lib/NumberProperty`, and `@cybernaut/core/lib/StringProperty`.
- Added the property `retries` to the class `@cybernaut/engine/lib/Engine`.
- Added the property `retryDelay` to the class `@cybernaut/engine/lib/Engine`.

### Changed

- **Breaking:** Renamed the method `navigate` to `navigateTo` of the class `@cybernaut/chrome/lib/Chrome`.
- **Breaking:** Removed the class `@cybernaut/core/lib/GenericConditionBuilder`.
- **Breaking:** Removed the class `@cybernaut/core/lib/NumberConditionBuilder`.
- **Breaking:** Removed the class `@cybernaut/core/lib/StringConditionBuilder`.
- **Breaking:** Removed the class `@cybernaut/core/lib/GenericProperty`.
- **Breaking:** Removed the class `@cybernaut/core/lib/NumberProperty`.
- **Breaking:** Removed the class `@cybernaut/core/lib/StringProperty`.
- **Breaking (TypeScript):** Removed generic type declarations from the class `@cybernaut/engine/lib/Engine`.
- **Breaking (TypeScript):** Removed generic type declarations from the class `@cybernaut/mocks/lib/MockCondition`.
- **Breaking (TypeScript):** Removed generic type declarations from the interface `@cybernaut/types/lib/Accessor`.
- **Breaking (TypeScript):** Removed generic type declarations from the interface `@cybernaut/types/lib/Condition`.
- **Breaking (TypeScript):** Removed generic type declarations from the interface `@cybernaut/types/lib/Predicate`.

### Fixed

[external-keepachangelog]: http://keepachangelog.com/en/1.0.0/
[external-semver-spec]: http://semver.org/spec/v2.0.0.html
