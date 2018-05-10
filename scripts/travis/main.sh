#!/bin/bash

set -e

make build
make test
make test-down
./scripts/travis/push-images.sh
