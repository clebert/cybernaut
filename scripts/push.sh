#!/bin/bash

set -e

if [ -z "$DOCKER_USERNAME" ]; then
  echo 'Missing environment variable: DOCKER_USERNAME'
  exit 1
fi

if [ -z "$DOCKER_PASSWORD" ]; then
  echo 'Missing environment variable: DOCKER_PASSWORD'
  exit 1
fi

./scripts/ci.sh

git push --follow-tags origin master

npm publish

docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

GIT_TAG=$("$(npm bin)"/git-latest-semver-tag)
VERSION="${GIT_TAG:1}"

for TARGET in chrome firefox
do
  docker push clebert/cybernaut-"$TARGET"
  docker push clebert/cybernaut-"$TARGET":"$VERSION"
done
