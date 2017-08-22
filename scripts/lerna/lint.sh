#!/bin/sh

set -e

# IMPORTANT: If you change the script, please check it with ShellCheck.
# http://www.shellcheck.net/

NODE_MODULES=../../node_modules

"$NODE_MODULES"/.bin/tslint \
  --config tslint.json \
  --project tsconfig.json \
  --type-check \
  --formatters-dir "$NODE_MODULES"/custom-tslint-formatters/formatters/ \
  --format grouped \
  '{src,types}/**/*.{ts,tsx}'
