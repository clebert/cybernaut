#!/bin/sh

set -e

if [ -z "$DOCKER_USERNAME" ]; then
  echo 'Missing environment variable: DOCKER_USERNAME'
  exit 1
fi

if [ -z "$DOCKER_PASSWORD" ]; then
  echo 'Missing environment variable: DOCKER_PASSWORD'
  exit 1
fi

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

RESULT=$(CI='' "$(npm bin)"/semantic-release pre 2>&1 >/dev/null | grep 'Determined version ' | cut -d '{' -f 2 | cut -d '}' -f 1)
VERSION=$(node -p "o={${RESULT}};o.version||''")

if [ -z "$VERSION" ]; then
  echo 'There are no relevant changes, so no new version is released.'
  exit 0
fi

echo "Determined version $VERSION"

docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

docker push "clebert/cybernaut-$1:latest"
docker push "clebert/cybernaut-$1:$VERSION"
