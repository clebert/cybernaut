#!/bin/bash

DIRNAME=`pwd`/`dirname $0`

docker build -t clebert/cybernaut-example "$DIRNAME"
