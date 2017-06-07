#!/bin/sh

set -e

export DEBUG='cybernaut:*'
export NO_DOCKER_CACHE=true

make
