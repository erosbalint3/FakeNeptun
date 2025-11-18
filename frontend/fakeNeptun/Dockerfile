# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -f

# Copy source code
COPY . .

# Build application
RUN npm run start