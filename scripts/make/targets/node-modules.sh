#!/bin/sh

set -e

echo '# Installing the npm dependencies #######################################'

npm prune
npm install
