# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][external-keepachangelog]
and this project adheres to [Semantic Versioning][external-semver-spec].

## [Unreleased]

### Added

#### @cybernaut/core/lib/ConditionBuilder

- Added as a replacement for the classes `GenericConditionBuilder`, `NumberConditionBuilder`, and `StringConditionBuilder`.

#### @cybernaut/core/lib/Property

- Added as a replacement for the classes `GenericProperty`, `NumberProperty`, and `StringProperty`.

### Changed

#### @cybernaut/chrome/lib/Chrome

- **Breaking:** Renamed the method `navigate()` to `navigateTo()`.

#### @cybernaut/core/lib/GenericConditionBuilder

- **Breaking:** Removed this class.

#### @cybernaut/core/lib/NumberConditionBuilder

- **Breaking:** Removed this class.

#### @cybernaut/core/lib/StringConditionBuilder

- **Breaking:** Removed this class.

#### @cybernaut/core/lib/GenericProperty

- **Breaking:** Removed this class.

#### @cybernaut/core/lib/NumberProperty

- **Breaking:** Removed this class.

#### @cybernaut/core/lib/StringProperty

- **Breaking:** Removed this class.

#### @cybernaut/engine/lib/Engine

- **Breaking (TypeScript):** Removed a generic type declaration.

#### @cybernaut/mocks/lib/MockCondition

- **Breaking (TypeScript):** Removed a generic type declaration.

#### @cybernaut/types/lib/Accessor

- **Breaking (TypeScript):** Removed a generic type declaration.

#### @cybernaut/types/lib/Condition

- **Breaking (TypeScript):** Removed a generic type declaration.

#### @cybernaut/types/lib/Predicate

- **Breaking (TypeScript):** Removed a generic type declaration.

### Fixed

[external-keepachangelog]: http://keepachangelog.com/en/1.0.0/
[external-semver-spec]: http://semver.org/spec/v2.0.0.html
