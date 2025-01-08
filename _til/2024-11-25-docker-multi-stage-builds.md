---
layout: post
title: "Docker Multi-Stage Builds for Smaller Images"
description: "Using multi-stage builds in Docker to create smaller, more secure production images while maintaining a full development environment"
category: docker
tags: [containers, optimization, devops]
---

Today I learned about Docker multi-stage builds, which help create smaller production images by separating build-time dependencies from runtime dependencies.

Example multi-stage Dockerfile:
```dockerfile
# Build stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["npm", "start"]
```

Benefits:
- Smaller final image size
- Fewer security vulnerabilities
- Cleaner separation of concerns
- No need for separate Dockerfiles
