# Manual Deploy Script (Alternative to SSH)

# If SSH isn't set up, run these commands manually on VPS:

# 1. Login to GitHub Container Registry
podman login ghcr.io -u YOUR_GITHUB_USERNAME

# 2. Pull latest images
podman-compose -f docker-compose.production.yml pull

# 3. Restart containers
podman-compose -f docker-compose.production.yml up -d

# 4. Check status
podman-compose -f docker-compose.production.yml ps