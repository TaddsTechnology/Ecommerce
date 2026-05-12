FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for building
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

# Build server
RUN npm run build

# Build dashboard
RUN npm run build:dashboard

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/static ./static
COPY --from=builder /app/node_modules/@vendure/dashboard ./node_modules/@vendure/dashboard

EXPOSE 3000

CMD ["node", "dist/index.js"]