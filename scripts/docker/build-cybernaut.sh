#!/bin/sh

set -e

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

mkdir -p "docker/cybernaut-$1/cybernaut"

cp -f config-schema.json "docker/cybernaut-$1/cybernaut/config-schema.json"
cp -rf dist "docker/cybernaut-$1/cybernaut/dist"
cp -f package.json "docker/cybernaut-$1/cybernaut/package.json"
cp -rf types "docker/cybernaut-$1/cybernaut/types"

cp -f scripts/lib/cybernaut-xvfb.sh "docker/cybernaut-$1/cybernaut-xvfb.sh"

# docker build -t "clebert/cybernaut-$1:latest" -t "clebert/cybernaut-$1:$VERSION" "docker/cybernaut-$1"
docker build -t "clebert/cybernaut-$1:latest" "docker/cybernaut-$1"

rm -rf "docker/cybernaut-$1/cybernaut"
rm -f "docker/cybernaut-$1/cybernaut-xvfb.sh"
