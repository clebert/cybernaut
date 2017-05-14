#!/bin/sh

set -e

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ] && [ "$1" != "iphone" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

docker run -it --rm \
  -v /dev/shm:/dev/shm \
  -e DEBUG="$DEBUG" \
  "clebert/cybernaut-$1-example"
