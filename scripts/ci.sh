#!/bin/sh

set -e

./scripts/check.sh
./scripts/test.sh

export NO_DOCKER_CACHE=true

DEBUG='cybernaut:*' ./scripts/example.sh
