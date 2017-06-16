#!/bin/bash

set -e

echo '# Compiling the examples ################################################'

rm -rf examples/dist

"$(npm bin)"/tsc --project examples

echo '# Linting the examples ##################################################'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project examples/tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  'examples/src/**/*.ts'

echo '# Checking the formatting of the examples ###############################'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  'examples/src/**/*.ts'

echo '# Running the examples (Chrome) #########################################'

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$(pwd)"/examples/dist:/opt/cybernaut-tests \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome | tee examples/dist/chrome.log

if [ "${PIPESTATUS[0]}" != 0 ];
then
  exit "${PIPESTATUS[0]}"
fi
