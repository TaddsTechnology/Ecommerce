#!/bin/bash

# Ecommerce VPS Deploy Script
# Run this on VPS to pull and restart containers

set -e

echo "========================================="
echo "Ecommerce Deploy Script"
echo "========================================="

# Configuration
IMAGE_NAME="ghcr.io/YOUR_USERNAME/storefront"
SERVER_IMAGE="ghcr.io/YOUR_USERNAME/storefront/server"
STOREFRONT_IMAGE="ghcr.io/YOUR_USERNAME/storefront/storefront"
COMPOSE_FILE="docker-compose.production.yml"

# Check if GHCR credentials exist
if [ -f ~/.podman-auth ]; then
    echo "Logging into GHCR..."
    cat ~/.podman-auth | podman login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
fi

# Pull latest images
echo "Pulling latest images..."
podman-compose -f $COMPOSE_FILE pull

# Stop old containers
echo "Stopping old containers..."
podman-compose -f $COMPOSE_FILE down

# Start new containers
echo "Starting new containers..."
podman-compose -f $COMPOSE_FILE up -d

# Show status
echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
podman-compose -f $COMPOSE_FILE ps