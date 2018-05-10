#!/bin/bash

set -e

# This push the images of modified services or all services if core is modified

if [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_EVENT_TYPE" == "pull_request" ]; then
  echo "Skipping push images step"
  exit 0
fi

echo "Pushing image on ${TRAVIS_BRANCH} ${TRAVIS_EVENT_TYPE}"

docker tag agavelab/frontendbase-app agavelab/frontendbase-app:"${TRAVIS_BUILD_ID}"
docker tag agavelab/frontendbase-app agavelab/frontendbase-app:latest
docker push agavelab/frontendbase-app:"${TRAVIS_BUILD_ID}"
docker push agavelab/frontendbase-app:latest