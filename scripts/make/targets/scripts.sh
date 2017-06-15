#!/bin/sh

set -e

echo '# Compiling the TS scripts ##############################################'

rm -rf scripts/dist

"$(npm bin)"/tsc --project scripts

echo '# Linting the TS scripts ################################################'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project scripts/tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  'scripts/src/**/*.ts'

echo '# Checking the formatting of the TS scripts #############################'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  'scripts/src/**/*.ts'

echo '# Checking the shell scripts ############################################'

docker run -it --rm \
  -v "$(pwd)"/scripts:/scripts \
  --entrypoint /bin/sh \
  koalaman/shellcheck \
  /scripts/lib/shellcheck.sh
