#!/usr/bin/env sh

set -e

EXITED_CONTAINERS=$(docker ps -a -q -f status=exited)

if [ -n "$EXITED_CONTAINERS" ]; then
  # shellcheck disable=SC2086
  docker rm -v $EXITED_CONTAINERS
fi

DANGLING_IMAGES=$(docker images -f "dangling=true" -q)

if [ -n "$DANGLING_IMAGES" ]; then
  # shellcheck disable=SC2086
  docker rmi $DANGLING_IMAGES
fi

DANGLING_VOLUMES=$(docker volume ls -qf dangling=true)

if [ -n "$DANGLING_VOLUMES" ]; then
  # shellcheck disable=SC2086
  docker volume rm $DANGLING_VOLUMES
fi
