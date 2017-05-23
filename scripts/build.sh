#!/bin/bash

set -e

./scripts/compile.sh

GIT_TAG=$("$(npm bin)"/git-latest-semver-tag)
VERSION="${GIT_TAG:1}"
HOME=scripts/build

for TARGET in chrome firefox
do
  RESOURCES="$HOME"/cybernaut-"$TARGET"/resources

  rm -rf "$RESOURCES" && mkdir -p "$RESOURCES"

  cp -f config-schema.json "$RESOURCES"/config-schema.json
  cp -rf dist "$RESOURCES"/dist
  cp -f package.json "$RESOURCES"/package.json
  cp -rf types "$RESOURCES"/types

  cp -f "$HOME"/cybernaut-xvfb.sh "$RESOURCES"/cybernaut-xvfb.sh

  docker build \
    -t clebert/cybernaut-"$TARGET":latest \
    -t clebert/cybernaut-"$TARGET":"$VERSION" \
    "$HOME"/cybernaut-"$TARGET"

  rm -rf "$RESOURCES"
done

./scripts/clean.sh
