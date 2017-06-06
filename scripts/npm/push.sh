#!/bin/bash

set -e

if [ -z "$DOCKER_USERNAME" ];
then
  echo 'Missing environment variable: DOCKER_USERNAME'
  exit 1
fi

if [ -z "$DOCKER_PASSWORD" ];
then
  echo 'Missing environment variable: DOCKER_PASSWORD'
  exit 1
fi

GIT_TAG=$("$(npm bin)"/git-latest-semver-tag)
VERSION="${GIT_TAG:1}"

./scripts/travis/script.sh

docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

for TARGET in chrome firefox
do
  docker push clebert/cybernaut-"$TARGET":latest
  docker push clebert/cybernaut-"$TARGET":"$VERSION"
done

git push --follow-tags origin master

rm -rf package && mkdir -p package

cp -f config-schema.json package/config-schema.json
cp -rf dist package/dist
cp -f package.json package/package.json
cp -rf types package/types

rm -f package.tar.gz && tar czf package.tar.gz package

npm publish package.tar.gz
