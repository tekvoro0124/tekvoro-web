FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy all application code first
COPY . .

# Install all dependencies (including dev for build)
RUN npm install --legacy-peer-deps || true

# Build frontend
RUN npm run build

# Install production dependencies only
RUN npm install --production --legacy-peer-deps || true && \
    cd api && npm install --production --legacy-peer-deps || true && cd ..

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy everything from builder (includes built dist and node_modules)
COPY --from=builder /app /app

# Expose port
EXPOSE 5002

# Start the application
CMD ["node", "api/server.js"]
