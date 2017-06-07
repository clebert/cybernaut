#!/bin/bash

set -e

GIT_TAG=$("$(npm bin)"/git-latest-semver-tag)
VERSION="${GIT_TAG:1}"

for TARGET in chrome firefox
do
  RESOURCES=docker/cybernaut-"$TARGET"/resources

  rm -rf "$RESOURCES" && mkdir -p "$RESOURCES"

  cp -f config-schema.json "$RESOURCES"/config-schema.json
  cp -rf dist "$RESOURCES"/dist
  cp -f package.json "$RESOURCES"/package.json
  cp -rf types "$RESOURCES"/types

  cp -f scripts/lib/cybernaut-xvfb.sh "$RESOURCES"/cybernaut-xvfb.sh

  docker build \
    --no-cache="${NO_DOCKER_CACHE:=false}" \
    -t clebert/cybernaut-"$TARGET":latest \
    -t clebert/cybernaut-"$TARGET":"$VERSION" \
    docker/cybernaut-"$TARGET"
done

./scripts/lib/clean-docker.sh
