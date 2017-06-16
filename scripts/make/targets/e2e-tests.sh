#!/bin/bash

set -e

echo '# Compiling the E2E tests ###############################################'

rm -rf e2e-tests/dist

"$(npm bin)"/tsc --project e2e-tests

echo '# Linting the E2E tests #################################################'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project e2e-tests/tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  'e2e-tests/src/**/*.ts'

echo '# Checking the formatting of the E2E tests ##############################'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  'e2e-tests/src/**/*.ts'

echo '# Running the E2E tests (Chrome) ########################################'

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$(pwd)"/e2e-tests/dist:/opt/cybernaut-tests \
  -v "$(pwd)"/e2e-tests/static:/opt/static \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome | tee e2e-tests/dist/chrome.log

if [ "${PIPESTATUS[0]}" != 0 ];
then
  exit "${PIPESTATUS[0]}"
fi

echo '# Diffing the E2E test snapshots (Chrome) ###############################'

node scripts/dist/normalize-log.js e2e-tests/dist/chrome.log

diff e2e-tests/snapshots/chrome.log.json e2e-tests/dist/chrome.log.json

echo '# Running the E2E tests (Firefox) #######################################'

docker run -it --rm \
  -e DEBUG="$DEBUG" \
  -v "$(pwd)"/e2e-tests/dist:/opt/cybernaut-tests \
  -v "$(pwd)"/e2e-tests/static:/opt/static \
  clebert/cybernaut-firefox | tee e2e-tests/dist/firefox.log

if [ "${PIPESTATUS[0]}" != 0 ];
then
  exit "${PIPESTATUS[0]}"
fi

echo '# Diffing the E2E test snapshots (Firefox) ##############################'

node scripts/dist/normalize-log.js e2e-tests/dist/firefox.log

diff e2e-tests/snapshots/firefox.log.json e2e-tests/dist/firefox.log.json
