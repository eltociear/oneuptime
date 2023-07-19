#!/usr/bin/env bash

# Run database in docker-compose

cd ..
# Run Preinstall. 
npm run prerun
# Run Postgres
npm run read-env && docker compose up -f docker-compose.dev.yml -d postgres