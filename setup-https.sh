#!/bin/bash

# Ecommerce HTTPS Setup Script
# Run this on your VPS to enable HTTPS with Let's Encrypt

echo "========================================="
echo "Ecommerce HTTPS Setup"
echo "========================================="

# Check if domain is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup-https.sh your-domain.com"
    echo "Example: ./setup-https.sh mystore.com"
    echo ""
    echo "Or use Cloudflare for free HTTPS (no domain needed):"
    echo "  1. Sign up at cloudflare.com"
    echo "  2. Add your domain"
    echo "  3. Change nameservers"
    exit 1
fi

DOMAIN=$1
EMAIL="admin@$DOMAIN"

echo "Setting up HTTPS for: $DOMAIN"

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing nginx..."
    sudo apt update
    sudo apt install -y nginx certbot python3-certbot-nginx
fi

# Stop any running containers on port 80/443
echo "Stopping containers that use port 80/443..."
podman-compose -f docker-compose.production.yml down 2>/dev/null || true

# Create nginx config
echo "Creating nginx configuration..."

sudo tee /etc/nginx/sites-available/ecommerce > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # API endpoints
    location /shop-api {
        proxy_pass http://localhost:3000/shop-api;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /admin-api {
        proxy_pass http://localhost:3000/admin-api;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /assets {
        proxy_pass http://localhost:3000/assets;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t

echo "Getting SSL certificate from Let's Encrypt..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --agree-tos --email $EMAIL --non-interactive

# Restart containers
echo "Starting ecommerce containers..."
podman-compose -f docker-compose.production.yml up -d

echo ""
echo "========================================="
echo "HTTPS Setup Complete!"
echo "========================================="
echo ""
echo "Your site is now available at:"
echo "  https://$DOMAIN"
echo ""
echo "Storefront: https://$DOMAIN"
echo "Admin: https://$DOMAIN/admin-api"
echo ""
echo "To renew SSL certificate:"
echo "  sudo certbot renew"