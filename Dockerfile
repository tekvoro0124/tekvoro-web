FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build frontend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY api/package*.json ./api/

# Install production dependencies only
RUN npm install --production --legacy-peer-deps && \
    cd api && npm install --production --legacy-peer-deps && cd ..

# Copy application code
COPY . .

# Copy built frontend from builder
COPY --from=builder /app/dist ./dist

# Copy API files
COPY api/ ./api/

# Expose port
EXPOSE 5002

# Start the application
CMD ["node", "api/server.js"]
