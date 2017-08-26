#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck:
# http://www.shellcheck.net/

git clean -e todo.tasks -xdfn

printf '\nDo you want to proceed? (y/n) '
read -r answer

if echo "$answer" | grep -iq '^y'
then
  printf 'Yes\n\n'

  git clean -e todo.tasks -xdf
else
  printf 'No\n\n'
fi
