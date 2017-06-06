#!/bin/sh

set -e -x

docker run -it --rm \
  -v "$(pwd)"/scripts:/scripts \
  --entrypoint /bin/sh \
  koalaman/shellcheck \
  /scripts/lib/shellcheck.sh
