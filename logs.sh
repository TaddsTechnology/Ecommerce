#!/bin/bash

# Ecommerce Log & Monitor Script
# Usage: ./logs.sh [command]

COMPOSE_FILE="docker-compose.production.yml"

case "${1:-help}" in
  logs|log)
    echo "=== Server Logs (last 50 lines) ==="
    podman logs --tail 50 ecommerce_server
    echo ""
    echo "=== Storefront Logs (last 50 lines) ==="
    podman logs --tail 50 ecommerce_storefront
    ;;
  logs-f|log-f)
    echo "=== Streaming Server Logs ==="
    podman logs -f ecommerce_server
    ;;
  server)
    echo "=== Server Logs ==="
    podman logs --tail "${2:-100}" ecommerce_server
    ;;
  storefront)
    echo "=== Storefront Logs ==="
    podman logs --tail "${2:-100}" ecommerce_storefront
    ;;
  postgres)
    echo "=== PostgreSQL Logs ==="
    podman logs --tail "${2:-100}" ecommerce_postgres
    ;;
  redis)
    echo "=== Redis Logs ==="
    podman logs --tail "${2:-100}" ecommerce_redis
    ;;
  all)
    podman logs --tail "${2:-50}" ecommerce_server
    podman logs --tail "${2:-50}" ecommerce_storefront
    podman logs --tail "${2:-50}" ecommerce_postgres
    podman logs --tail "${2:-50}" ecommerce_redis
    ;;
  status|ps)
    echo "=== Container Status ==="
    podman-compose -f $COMPOSE_FILE ps
    ;;
  stats|stat)
    echo "=== Resource Usage ==="
    podman stats --no-stream --format "table {{.Name}}\t{{.CPU}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
    ;;
  dozzle)
    echo "=== Dozzle (Container Logs UI) ==="
    echo "Open: http://localhost:8080"
    podman logs --tail 10 ecommerce_dozzle
    ;;
  beszel)
    echo "=== Beszel (Server Monitoring UI) ==="
    echo "Open: http://localhost:8081"
    podman logs --tail 10 ecommerce_beszel
    ;;
  restart)
    echo "=== Restarting All Services ==="
    podman-compose -f $COMPOSE_FILE restart
    ;;
  build)
    echo "=== Rebuilding and Starting ==="
    podman-compose -f $COMPOSE_FILE up -d --build
    ;;
  pull)
    echo "=== Pulling Latest Images ==="
    podman-compose -f $COMPOSE_FILE pull
    podman-compose -f $COMPOSE_FILE up -d
    ;;
  down)
    echo "=== Stopping All Services ==="
    podman-compose -f $COMPOSE_FILE down
    ;;
  up)
    echo "=== Starting All Services ==="
    podman-compose -f $COMPOSE_FILE up -d
    ;;
  clean)
    echo "=== Cleaning Logs ==="
    podman system prune --log
    echo "Logs cleaned!"
    ;;
  help|*)
    echo "Ecommerce Log & Monitor Script"
    echo ""
    echo "Usage: ./logs.sh [command]"
    echo ""
    echo "Commands:"
    echo "  logs        - Show last 50 lines of server & storefront logs"
    echo "  logs-f     - Stream server logs in real-time"
    echo "  server     - Show server logs"
    echo "  storefront - Show storefront logs"
    echo "  postgres   - Show database logs"
    echo "  redis      - Show redis logs"
    echo "  all        - Show all container logs"
    echo "  status     - Container status (ps)"
    echo "  stats      - Resource usage (CPU/Memory)"
    echo "  dozzle     - Open Dozzle web UI (port 8080)"
    echo "  beszel     - Open Beszel web UI (port 8081)"
    echo "  restart   - Restart all containers"
    echo "  pull      - Pull latest & restart"
    echo "  up        - Start all containers"
    echo "  down      - Stop all containers"
    echo "  clean     - Clean old logs"
    echo ""
    echo "Examples:"
    echo "  ./logs.sh logs              # View recent logs"
    echo "  ./logs.sh server 200      # View 200 lines of server logs"
    echo "  ./logs.sh dozzle           # Check Dozzle status"
    echo "  ./logs.sh stats           # View resource usage"
    ;;
esac