#!/bin/bash

set -e

HOME=scripts/compile
RESOURCES="$HOME"/resources

rm -rf "$RESOURCES" && mkdir -p "$RESOURCES"

cp -f package.json "$RESOURCES"/package.json
cp -rf src "$RESOURCES"/src
cp -f tsconfig.json "$RESOURCES"/tsconfig.json
cp -rf types "$RESOURCES"/types

DOCKER_TAG=clebert/cybernaut-compile

docker build -t "$DOCKER_TAG" "$HOME"

rm -rf "$RESOURCES"

./scripts/clean.sh

rm -rf dist && mkdir -p dist

docker run -it --rm -v "$(pwd)"/dist:/opt/cybernaut/dist "$DOCKER_TAG"

if [ "$TRAVIS" == "true" ]; then
  sudo chown -R travis dist
fi

chmod +x dist/index.js
