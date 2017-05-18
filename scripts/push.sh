#!/bin/sh

set -e

./scripts/docker/push-cybernaut.sh chrome
./scripts/docker/push-cybernaut.sh firefox

git push --follow-tags origin master

npm publish
