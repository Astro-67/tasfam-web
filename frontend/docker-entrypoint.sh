#!/bin/sh
set -e

# Run database migrations
node ./node_modules/prisma/build/index.js migrate deploy

# Seed database (only runs if empty)
node ./node_modules/prisma/build/index.js db seed || true

# Start the application
exec node server.js
