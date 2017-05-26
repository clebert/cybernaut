#!/bin/sh

set -e

./scripts/build.sh

HOME="$(pwd)"/scripts/example

rm -rf "$HOME"/dist

"$(npm bin)"/tsc --project "$HOME"

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$HOME"/dist:/opt/cybernaut-tests \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$HOME"/dist:/opt/cybernaut-tests \
  clebert/cybernaut-firefox

rm -rf "$HOME"/dist
