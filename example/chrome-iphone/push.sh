#!/bin/bash

DIRNAME=`pwd`/`dirname $0`

if [ -z "$DOCKER_USERNAME" ]; then
  echo 'Missing environment variable: DOCKER_USERNAME'
  exit 1
fi

if [ -z "$DOCKER_PASSWORD" ]; then
  echo 'Missing environment variable: DOCKER_PASSWORD'
  exit 1
fi

if [ "$TRAVIS_BRANCH" == "master" ] || [ -z "$TRAVIS_BRANCH" ]; then
  docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" && \
  docker push clebert/cybernaut-example-chrome-iphone
fi
