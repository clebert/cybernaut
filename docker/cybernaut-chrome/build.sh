#!/bin/bash

DIRNAME=`pwd`/`dirname $0`

mkdir -p "$DIRNAME/cybernaut" && \

cp -f "$DIRNAME/../../config-schema.json" "$DIRNAME/cybernaut/config-schema.json" && \
cp -rf "$DIRNAME/../../dist" "$DIRNAME/cybernaut/dist" && \
cp -f "$DIRNAME/../../package.json" "$DIRNAME/cybernaut/package.json" && \

cp -f "$DIRNAME/../cybernaut-xvfb" "$DIRNAME/cybernaut-xvfb" && \

docker build -t clebert/cybernaut-chrome "$DIRNAME"

rm -rf "$DIRNAME/cybernaut"
rm -f "$DIRNAME/cybernaut-xvfb"
