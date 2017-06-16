#!/bin/sh

set -e

echo '# Linting the commit message ############################################'

"$(npm bin)"/conventional-changelog-lint --from=HEAD~1
