#!/usr/bin/env sh

set -e

DEBUG='cybernaut:*' ./scripts/docker/run-example.sh chrome
DEBUG='cybernaut:*' ./scripts/docker/run-example.sh firefox
DEBUG='cybernaut:*' ./scripts/docker/run-example.sh iphone
