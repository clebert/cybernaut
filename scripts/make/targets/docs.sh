#!/bin/sh

set -e

echo '# Generating the API documentation ######################################'

rm -rf docs/api-reference/browser && mkdir -p docs/api-reference/browser

for FILENAME in examples/src/browser/*.e2e.ts
do
  node scripts/dist/generate-api-reference.js "$FILENAME"
done

rm -rf docs/api-reference/element && mkdir -p docs/api-reference/element

for FILENAME in examples/src/element/*.e2e.ts
do
  node scripts/dist/generate-api-reference.js "$FILENAME"
done

rm -rf docs/api-reference/it && mkdir -p docs/api-reference/it

for FILENAME in examples/src/it/*.e2e.ts
do
  node scripts/dist/generate-api-reference.js "$FILENAME"
done

rm -rf docs/api-reference/utils && mkdir -p docs/api-reference/utils

for FILENAME in examples/src/utils/*.e2e.ts
do
  node scripts/dist/generate-api-reference.js "$FILENAME"
done

echo '# Generating the summary ################################################'

node scripts/dist/generate-summary.js

echo '# Updating the README ###################################################'

node scripts/dist/update-readme.js

echo '# Linting the documentation #############################################'

node scripts/dist/lint-docs.js
