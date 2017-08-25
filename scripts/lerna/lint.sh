#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck.
# http://www.shellcheck.net/

NODE_MODULES=../../node_modules

"$NODE_MODULES"/.bin/tslint \
  --config tslint.json \
  --project tsconfig.json \
  --type-check \
  --formatters-dir "$NODE_MODULES"/custom-tslint-formatters/formatters/ \
  --format grouped \
  '{src,types}/**/*.{ts,tsx}'
