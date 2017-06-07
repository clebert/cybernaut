#!/bin/sh

set -e

SCRIPTS=$(find /scripts -name '*.sh')

# shellcheck disable=SC2086
shellcheck $SCRIPTS
