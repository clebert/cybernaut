#!/bin/sh

set -e -x

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  ./scripts/docker/push-cybernaut.sh chrome
  ./scripts/docker/push-cybernaut.sh firefox

  semantic-release pre
  npm publish
  semantic-release post

  "$(npm bin)"/nyc report --reporter=text-lcov | "$(npm bin)"/coveralls
fi
