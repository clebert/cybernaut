#!/bin/bash

if [ -z "$TRAVIS" ]; then
  EXITED_CONTAINERS=$(docker ps -a -q -f status=exited)

  if [ -n "$EXITED_CONTAINERS" ]; then
    docker rm -v $EXITED_CONTAINERS
  fi

  DANGLING_IMAGES=$(docker images -f "dangling=true" -q)

  if [ -n "$DANGLING_IMAGES" ]; then
    docker rmi $DANGLING_IMAGES
  fi

  DANGLING_VOLUMES=$(docker volume ls -qf dangling=true)

  if [ -n "$DANGLING_VOLUMES" ]; then
    docker volume rm $DANGLING_VOLUMES
  fi
fi
