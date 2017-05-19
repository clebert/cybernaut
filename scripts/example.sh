#!/bin/sh

set -e

./scripts/build.sh

HOME="$(pwd)"/scripts/example

rm -rf "$HOME"/dist

"$(npm bin)"/tsc --project "$HOME"

DEBUG='cybernaut:*'

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$HOME"/dist:/opt/cybernaut-tests \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$HOME"/dist:/opt/cybernaut-tests \
  clebert/cybernaut-firefox

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$HOME"/iphone:/opt/cybernaut-config \
  -v "$HOME"/dist:/opt/cybernaut-tests \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome
