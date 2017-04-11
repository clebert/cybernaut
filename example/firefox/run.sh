#!/bin/bash

DIRNAME=`pwd`/`dirname $0`

mkdir -p "$DIRNAME/screenshots" && \
docker run -ti --rm -v $(cd "$DIRNAME/screenshots"; pwd):/opt/e2e-test/screenshots clebert/cybernaut-example-firefox
