#!/bin/sh
set -e

# Run database migrations (use local prisma, not global npx)
./node_modules/.bin/prisma migrate deploy

# Seed database (only runs if empty)
./node_modules/.bin/prisma db seed || true

# Start the application
exec node server.js
