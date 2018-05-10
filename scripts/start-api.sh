#!/bin/bash

set -e

git clone https://${GITHUB_TOKEN}@github.com/agave/backend-base.git
cd backend-base
docker-compose pull
chmod +x services/api/scripts/startup.integration.sh
chmod +x services/user/scripts/startup.integration.sh
make build
../scripts/torus run -e travis -s travis --project backend -- \
		docker-compose -f docker-compose.yml \
                    -f docker-compose.dev.yml \
                		-f services/api/docker-compose.dev.yml \
                		-f docker-compose.integration.yml up -d api