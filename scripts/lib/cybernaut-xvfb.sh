#!/bin/bash

set -e

if [ -z "$1" ]
then
  echo 'Missing argument: screen size'
  exit 1
fi

if [ -z "$2" ]
then
  echo 'Missing argument: reporter'
  exit 1
fi

browser_exists() {
  type "$1" > /dev/null 2>&1
}

if browser_exists google-chrome;
then
  echo Browser: "$(google-chrome --version)"
fi

if browser_exists firefox;
then
  echo Browser: "$(firefox -v)"
fi

echo Screen: "$1"

Xvfb :99 -screen 0 "$1x16" &

export DISPLAY=:99

# https://github.com/SeleniumHQ/docker-selenium/issues/87#issuecomment-187580115
export DBUS_SESSION_BUS_ADDRESS=/dev/null

cybernaut /opt/cybernaut-config/config.json | tap-mocha-reporter "$2"

# http://stackoverflow.com/a/90435
exit "${PIPESTATUS[0]}"
