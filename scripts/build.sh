#!/usr/bin/env sh

set -e

./scripts/docker/build-cybernaut.sh chrome
./scripts/docker/build-cybernaut.sh firefox

./scripts/docker/build-example.sh chrome
./scripts/docker/build-example.sh firefox
./scripts/docker/build-example.sh iphone

./scripts/docker/clean.sh
