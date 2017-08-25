#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck.
# http://www.shellcheck.net/

for package in @cybernaut/*/
do
  cp .npmrc "$package"
  cp configs/* "$package"
done
