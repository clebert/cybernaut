#!/bin/sh

set -e

# IMPORTANT: If you change the script, please check it with ShellCheck.
# http://www.shellcheck.net/

git fetch --unshallow

"$(npm bin)"/commitlint --from="$TRAVIS_BRANCH" --to="$TRAVIS_COMMIT"
"$(npm bin)"/commitlint --from="$TRAVIS_COMMIT"
