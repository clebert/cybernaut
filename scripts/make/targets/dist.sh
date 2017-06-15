#!/bin/bash

set -e

echo '# Compiling the sources #################################################'

rm -rf dist

"$(npm bin)"/tsc --project .

chmod +x dist/index.js

echo '# Linting the sources ###################################################'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  '{src,types}/**/*.ts'

echo '# Checking the formatting of the sources ################################'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  '{src,types}/**/*.ts'

echo '# Running the unit tests ################################################'

DEBUG='cybernaut:*' "$(npm bin)"/jest --coverage --no-cache --verbose

echo '# Building the Docker containers ########################################'

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
    --no-cache="${NO_CACHE:=false}" \
    -t clebert/cybernaut-"$TARGET":latest \
    -t clebert/cybernaut-"$TARGET":"$VERSION" \
    docker/cybernaut-"$TARGET"
done

echo '# Cleaning the Docker artifacts #########################################'

EXITED_CONTAINERS=$(docker ps -a -q -f status=exited)

if [ -n "$EXITED_CONTAINERS" ];
then
  # shellcheck disable=SC2086
  docker rm -v $EXITED_CONTAINERS
fi

DANGLING_IMAGES=$(docker images -f "dangling=true" -q)

if [ -n "$DANGLING_IMAGES" ];
then
  # shellcheck disable=SC2086
  docker rmi $DANGLING_IMAGES
fi

DANGLING_VOLUMES=$(docker volume ls -qf dangling=true)

if [ -n "$DANGLING_VOLUMES" ];
then
  # shellcheck disable=SC2086
  docker volume rm $DANGLING_VOLUMES
fi
