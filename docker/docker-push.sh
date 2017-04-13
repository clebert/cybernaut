#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
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

  docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD" && \
  docker push "clebert/cybernaut-$1"
fi
