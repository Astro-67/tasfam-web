#!/bin/sh
set -e

# Run database migrations
npx prisma migrate deploy

# Seed database (only runs if empty)
npx prisma db seed || true

# Start the application
exec node server.js
