#!/bin/sh

set -e

find . -type f -name '*.md' \
  -not -name 'CHANGELOG.md' \
  -not -path '*/_book/*' \
  -not -path '*/node_modules/*'
