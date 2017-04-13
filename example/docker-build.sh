#!/bin/bash

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ] && [ "$1" != "iphone" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

cp -f example/example.e2e.js "example/$1/example.e2e.js" && \

docker build -t "clebert/cybernaut-$1-example" "example/$1"

STATUS=$?

rm -f "example/$1/example.e2e.js"

exit $STATUS
