#!/bin/bash

if [ "$1" != "chrome" ] && [ "$1" != "firefox" ]; then
  echo 'Illegal argument: target'
  exit 1
fi

mkdir -p "docker/cybernaut-$1/cybernaut" && \

cp -f config-schema.json "docker/cybernaut-$1/cybernaut/config-schema.json" && \
cp -rf dist "docker/cybernaut-$1/cybernaut/dist" && \
cp -f package.json "docker/cybernaut-$1/cybernaut/package.json" && \

cp -f docker/cybernaut-xvfb "docker/cybernaut-$1/cybernaut-xvfb" && \

docker build -t "clebert/cybernaut-$1" "docker/cybernaut-$1"

rm -rf "docker/cybernaut-$1/cybernaut"
rm -f "docker/cybernaut-$1/cybernaut-xvfb"
