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

GIT_TAG=$("$(npm bin)"/git-latest-semver-tag)
VERSION="${GIT_TAG:1}"

echo "Determined version $VERSION"

docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

docker push "clebert/cybernaut-$1:latest"
docker push "clebert/cybernaut-$1:$VERSION"
