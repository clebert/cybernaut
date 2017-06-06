#!/bin/sh

set -e

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$(pwd)"/example/dist:/opt/cybernaut-tests \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$(pwd)"/example/dist:/opt/cybernaut-tests \
  clebert/cybernaut-firefox
