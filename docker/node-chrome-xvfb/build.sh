#!/bin/bash

DIRNAME=`pwd`/`dirname $0`

docker build -t clebert/node-chrome-xvfb "$DIRNAME"
