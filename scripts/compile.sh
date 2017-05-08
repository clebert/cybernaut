#!/bin/sh

set -e

rm -rf dist/*

tsc --project .

chmod +x dist/index.js
