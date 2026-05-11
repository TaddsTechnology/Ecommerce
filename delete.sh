#!/bin/bash

# Ecommerce VPS Complete Cleanup Script
# Run this to COMPLETELY remove the entire ecommerce deployment

echo "========================================="
echo "COMPLETE Ecommerce Cleanup"
echo "========================================="

COMPOSE_FILE="docker-compose.production.yml"

# Stop all containers
echo "[1/6] Stopping all containers..."
podman-compose -f $COMPOSE_FILE down 2>/dev/null || true

# Remove all ecommerce containers
echo "[2/6] Removing containers..."
podman rm -f ecommerce_server ecommerce_storefront ecommerce_postgres ecommerce_redis ecommerce_dozzle ecommerce_beszel 2>/dev/null || true
podman rm -f $(podman ps -a --format "{{.Names}}" | grep -E "ecommerce|vendure|storefront") 2>/dev/null || true

# Remove all volumes
echo "[3/6] Removing volumes..."
podman volume rm ecommercevps_postgres_data ecommercevps_redis_data ecommercevps_beszel_data 2>/dev/null || true
podman volume rm $(podman volume ls -q | grep -E "ecommerce|vendure") 2>/dev/null || true

# Remove network
echo "[4/6] Removing network..."
podman network rm ecommerce_default 2>/dev/null || true
podman network rm $(podman network ls -q | grep -E "ecommerce") 2>/dev/null || true

# Remove images
echo "[5/6] Removing images..."
podman rmi $(podman images -q | grep -E "ecommerce|vendure|storefront|server|postgres|redis|dozzle|beszel") 2>/dev/null || true

# Clean system
echo "[6/6] Cleaning system..."
podman system prune -f 2>/dev/null || true

echo ""
echo "========================================="
echo "COMPLETE CLEANUP DONE!"
echo "========================================="
echo ""
echo "Everything is deleted - frontend, backend, database, all data!"