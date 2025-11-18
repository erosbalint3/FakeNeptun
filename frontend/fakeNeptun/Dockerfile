# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache g++ make python3

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps --force

# Fix Angular version mismatches
RUN npm install @angular/platform-browser@19.2.0 @angular/platform-browser-dynamic@19.2.0 --legacy-peer-deps --force

# Copy source code
COPY . .

# Build application for production
RUN npm run build --configuration=production

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist/fake-neptun/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]