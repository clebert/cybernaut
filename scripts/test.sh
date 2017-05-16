#!/bin/sh

set -e

DEBUG='cybernaut:*' "$(npm bin)"/jest --coverage --no-cache --verbose
