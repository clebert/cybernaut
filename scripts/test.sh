#!/bin/sh

set -e

DEBUG='cybernaut:*' "$(npm bin)"/nyc "$(npm bin)"/ava
