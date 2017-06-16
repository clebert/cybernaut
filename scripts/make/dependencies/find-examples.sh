#!/bin/sh

set -e

find examples -type f \
  -not -name '.DS_Store' \
  -not -path '*/dist/*'
