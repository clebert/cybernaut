#!/bin/sh

set -e

export DEBUG='cybernaut:*'
export NO_CACHE=true

make
