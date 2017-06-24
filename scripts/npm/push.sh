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

GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_TAG=$("$(npm bin)"/git-latest-semver-tag)
VERSION="${GIT_TAG:1}"

if [ "$GIT_BRANCH" != master ];
then
  echo 'Please checkout the master branch'
  exit 1
fi

export CI=true # Disable the Docker build cache.
export DEBUG='cybernaut:*'

make clean && make

echo '# Checking the Git status ###############################################'

if [ -n "$(git status --porcelain)" ];
then
  echo 'Dirty Git working tree'
  exit 1
fi

echo '# Pushing to GitHub #####################################################'

git push --follow-tags origin master

echo '# Publishing to npm #####################################################'

npm publish

echo '# Pushing to DockerHub ##################################################'

docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

for TARGET in chrome firefox
do
  docker push clebert/cybernaut-"$TARGET":latest
  docker push clebert/cybernaut-"$TARGET":"$VERSION"
done
