#!/usr/bin/env sh

set -e -x

./scripts/check.sh
./scripts/compile.sh
#./scripts/test.sh
./scripts/build.sh
./scripts/examples.sh
