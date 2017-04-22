#!/bin/bash

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ] && [ "$1" != "iphone" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

mkdir -p example/screenshots && \

docker run -ti --rm -v $(cd example/screenshots; pwd):/opt/e2e-test/screenshots -v /dev/shm:/dev/shm -e DEBUG=$DEBUG "clebert/cybernaut-$1-example"
