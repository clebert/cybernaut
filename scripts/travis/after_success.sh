#!/bin/sh

set -e -x

< coverage/lcov.info "$(npm bin)"/coveralls
