#!/bin/sh

set -e

find . -name '*.md' \
  ! -name 'CHANGELOG.md' \
  ! -path '*/_book/*' \
  ! -path '*/node_modules/*'
