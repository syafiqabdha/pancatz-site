# Stage 1: Build Astro site
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:1.27-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html/
RUN chmod 644 /usr/share/nginx/html/og-image.svg /usr/share/nginx/html/favicon.svg
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
