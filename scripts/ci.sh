#!/bin/sh

set -e

./scripts/check.sh
./scripts/test.sh

DEBUG='cybernaut:*' ./scripts/example.sh
