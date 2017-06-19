#!/bin/sh

set -e

echo '# Generating the API documentation ######################################'

rm -f "$(find docs/api-reference/exports -type f -name '*.md' -not -name 'test.md')"

node scripts/dist/generate-api-reference.js

echo '# Generating the summary ################################################'

node scripts/dist/generate-summary.js

echo '# Updating the README ###################################################'

node scripts/dist/update-readme.js

echo '# Linting the documentation #############################################'

node scripts/dist/lint-docs.js
