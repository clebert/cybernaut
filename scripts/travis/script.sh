#!/bin/sh

set -e

export DEBUG='cybernaut:*'

make clean && make
