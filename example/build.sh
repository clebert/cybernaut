#!/bin/bash

mkdir -p screenshots && \
docker build -t clebert/cybernaut-example . && \
docker run -ti --rm -v $(cd screenshots; pwd):/opt/e2e-test/screenshots clebert/cybernaut-example
