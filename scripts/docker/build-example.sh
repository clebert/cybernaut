#!/bin/sh

set -e

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ] && [ "$1" != "iphone" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

cp -f example/example.e2e.ts "example/$1/example.e2e.ts"
cp -f example/tsconfig.json "example/$1/tsconfig.json"

docker build -t "clebert/cybernaut-$1-example" "example/$1"

rm -f "example/$1/example.e2e.ts"
rm -f "example/$1/tsconfig.json"
