# /server/Dockerfile  (production multi-stage for TypeScript)
# Stage 1: build
FROM node:22-alpine AS builder
WORKDIR /app

# copy package files and install deps (including dev for tsc)
COPY package*.json ./
RUN npm i

# copy source & build
COPY . .
RUN npm run build

# Stage 2: production image
FROM node:22-alpine AS runtime
WORKDIR /app

# Only copy production deps
COPY package*.json ./
RUN npm i --production

# copy built files
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
# Use the port your app expects; Render will set env PORT if you need it.
EXPOSE 5000
CMD ["node", "dist/server.js"]




