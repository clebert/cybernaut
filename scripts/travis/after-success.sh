#!/bin/sh

set -e

# IMPORTANT: If you change the script, please check it with ShellCheck.
# http://www.shellcheck.net/

< coverage/lcov.info "$(npm bin)"/coveralls
