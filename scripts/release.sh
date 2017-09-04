#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck:
# http://www.shellcheck.net/

npm run clean
npm install
npm test

PREVIOUS_RELEASE=$("$(npm bin)"/git-latest-semver-tag)

lerna publish --skip-npm
lerna exec --ignore @cybernaut/examples --since="${PREVIOUS_RELEASE}" -- npm publish --access=public

git push --follow-tags origin master
