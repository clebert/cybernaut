#!/bin/sh

set -e

find e2e-tests -type f \
  -not -name '.DS_Store' \
  -not -path '*/dist/*'
