FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build
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

EXPOSE 3000

CMD ["node", "dist/index.js"]
