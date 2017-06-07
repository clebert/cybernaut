#!/bin/sh

set -e

"$(npm bin)"/conventional-changelog-lint --from=HEAD~1
