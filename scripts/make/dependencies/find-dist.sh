#!/bin/sh

set -e

find src types -type f -name '*.ts'

find docker/cybernaut-* -type f -not -path '*/resources/*'

echo 'tsconfig.json'
echo 'tslint.json'
