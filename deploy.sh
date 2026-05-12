#!/bin/bash

# Ecommerce VPS Deploy Script
# Run this on VPS to pull and restart containers

set -e

echo "========================================="
echo "Ecommerce Deploy Script"
echo "========================================="

# Configuration
COMPOSE_FILE="docker-compose.production.yml"

# Stop old containers
echo "Stopping old containers..."
podman-compose -f $COMPOSE_FILE down

# Rebuild images from the current source on the VPS
echo "Building images..."
podman-compose -f $COMPOSE_FILE build --no-cache

# Start new containers
echo "Starting new containers..."
podman-compose -f $COMPOSE_FILE up -d

# Show status
echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
podman-compose -f $COMPOSE_FILE ps
