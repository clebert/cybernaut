#!/bin/sh

set -e

# IMPORTANT: If you change the script, please check it with ShellCheck.
# http://www.shellcheck.net/

for package in @cybernaut/*/
do
  cp .npmrc "$package"
  cp configs/* "$package"
done
