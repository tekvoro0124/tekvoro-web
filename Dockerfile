FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy all application code first
COPY . .

# Install all dependencies (including dev for build)
RUN npm install --legacy-peer-deps || true

# Build frontend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install production dependencies only
RUN npm install --production --legacy-peer-deps && \
    cd api && npm install --production --legacy-peer-deps && cd ..

# Copy built frontend from builder
COPY --from=builder /app/dist ./dist

# Copy API files
COPY api/ ./api/

# Expose port
EXPOSE 5002

# Start the application
CMD ["node", "api/server.js"]
