#!/bin/bash

DIRNAME=`pwd`/`dirname $0`

cp -f "$DIRNAME/../example.e2e.js" "$DIRNAME/example.e2e.js" && \

docker build -t clebert/cybernaut-example-firefox "$DIRNAME"

rm -f "$DIRNAME/example.e2e.js"
