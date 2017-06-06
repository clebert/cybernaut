#!/bin/sh

set -e

< coverage/lcov.info "$(npm bin)"/coveralls
