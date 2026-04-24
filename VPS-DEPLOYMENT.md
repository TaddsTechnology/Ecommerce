# VPS Production Deployment Guide

This branch contains all configurations needed to deploy the Ecommerce application on a VPS using Podman.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        VPS                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  PostgreSQL  │  │    Redis     │  │   Server    │   │
│  │   :5432     │  │   :6379     │  │   :3000    │   │
│  └──────────────┘  └──────────────┘  └──────┬───────┘   │
│  ┌──────────────┐  ┌──────────────┐         │          │
│  │ Storefront  │  │  Podman      │         │          │
│  │   :3001    │  │  Network    │         │          │
│  └──────────────┘  └──────────────┘         │          │
│                              └──────────────┴──────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
                    External Access
                    (Port 3001)
```

## Prerequisites

- VPS with Ubuntu 20.04+ (2GB RAM minimum)
- Podman installed
- `podman-compose` installed

## Quick Start

### 1. Install Podman

```bash
sudo apt update
sudo apt install -y curl wget
curl -fsSL https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable/xUbuntu_$(lsb_release -rs)/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/kubic.gpg >/dev/null
echo 'deb https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable/xUbuntu_22.04/ /' | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
sudo apt update
sudo apt install -y podman podman-compose
```

### 2. Transfer Files to VPS

```bash
# On local machine - create archive
tar -czvf ecommerce.tar.gz apps/ docker-compose.production.yml

# Copy to VPS
scp ecommerce.tar.gz user@YOUR_VPS_IP:~/

# On VPS - extract
ssh user@YOUR_VPS_IP
tar -xzvf ecommerce.tar.gz
```

### 3. Configure Environment

```bash
# Server environment
cp apps/server/.env.production apps/server/.env
nano apps/server/.env  # Edit with strong passwords

# Storefront environment  
cp apps/storefront/.env.production apps/storefront/.env
```

### 4. Build & Start

```bash
# Build all images and start containers
podman-compose -f docker-compose.production.yml up -d --build

# Check status
podman-compose -f docker-compose.production.yml ps

# View logs
podman-compose -f docker-compose.production.yml logs -f
```

### 5. Access Application

- **Storefront**: http://YOUR_VPS_IP:3001
- **Server Admin API**: http://YOUR_VPS_IP:3000/admin-api
- **Shop API**: http://YOUR_VPS_IP:3000/shop-api

### 6. Superadmin Login

- **URL**: http://YOUR_VPS_IP:3000/admin-api
- **Username**: superadmin
- **Password**: (from .env SUPERADMIN_PASSWORD)

## Managing the Application

### View Logs

```bash
# All services
podman-compose -f docker-compose.production.yml logs -f

# Specific service
podman-compose -f docker-compose.production.yml logs -f server
podman-compose -f docker-compose.production.yml logs -f storefront
```

### Restart Services

```bash
podman-compose -f docker-compose.production.yml restart server
podman-compose -f docker-compose.production.yml restart storefront
```

### Stop/Start

```bash
podman-compose -f docker-compose.production.yml down
podman-compose -f docker-compose.production.yml up -d
```

### Update & Rebuild

```bash
podman-compose -f docker-compose.production.yml up -d --build
```

## Database Migration

When updating the server code, you may need to run migrations:

```bash
# Run migrations
podman exec -it ecommerce_server npx vendure migrate execute
```

## Troubleshooting

### Check Container Status

```bash
podman ps -a
```

### Check Logs

```bash
podman logs ecommerce_server
podman logs ecommerce_storefront
```

### Reset Database (CAUTION)

```bash
podman-compose -f docker-compose.production.yml down -v
podman volume rm ecommercevps_postgres_data
podman-compose -f docker-compose.production.yml up -d
```

## File Structure

```
ecommerce/
├── apps/
│   ├── server/
│   │   ├── src/
│   │   │   └── vendure-config.ts   # DB config (sqlite/postgres)
│   │   ├── package.json            # Added pg dependency
│   │   ├── Dockerfile             # Already exists
│   │   └── .env.production        # Production env template
│   └── storefront/
│       ├── src/
│       ├── next.config.ts          # Added standalone output
│       ├── Dockerfile           # NEW - multi-stage build
│       └── .env.production     # Production env template
├── docker-compose.production.yml    # Main orchestration
└── README.md
```

## Security Checklist

- [ ] Change all default passwords in .env
- [ ] Generate new COOKIE_SECRET (use random string generator)
- [ ] Generate new REVALIDATION_SECRET
- [ ] Set strong SUPERADMIN_PASSWORD
- [ ] Set strong POSTGRES_PASSWORD
- [ ] Consider using firewall (ufw)
- [ ] Consider SSL/TLS with reverse proxy

## Adding Nginx for HTTPS (Optional)

```bash
# Install nginx
sudo apt install nginx

# Create config
sudo nano /etc/nginx/sites-available/ecommerce
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```