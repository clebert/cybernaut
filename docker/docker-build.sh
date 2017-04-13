#!/bin/bash

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

RESULT=$(CI= $(npm bin)/semantic-release pre 2>&1 >/dev/null | grep 'Determined version ' | cut -d '{' -f 2 | cut -d '}' -f 1)
VERSION=$(node -p "o={${RESULT}};o.version||''")

mkdir -p "docker/cybernaut-$1/cybernaut" && \

cp -f config-schema.json "docker/cybernaut-$1/cybernaut/config-schema.json" && \
cp -rf dist "docker/cybernaut-$1/cybernaut/dist" && \
cp -f package.json "docker/cybernaut-$1/cybernaut/package.json" && \

cp -f docker/cybernaut-xvfb "docker/cybernaut-$1/cybernaut-xvfb" && \

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ -n "$VERSION" ]; then
  echo "Determined version $VERSION" && \

  docker build -t "clebert/cybernaut-$1:latest" -t "clebert/cybernaut-$1:$VERSION" "docker/cybernaut-$1"
else
  docker build -t "clebert/cybernaut-$1:latest" "docker/cybernaut-$1"
fi

STATUS=$?

rm -rf "docker/cybernaut-$1/cybernaut"
rm -f "docker/cybernaut-$1/cybernaut-xvfb"

exit $STATUS
