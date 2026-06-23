# syntax=docker/dockerfile:1

FROM node:22-alpine AS web-build
WORKDIR /app/apps/web
COPY apps/web/package.json apps/web/package-lock.json ./
RUN npm ci
COPY apps/web/ ./
RUN npm run build

FROM node:22-alpine AS api-build
WORKDIR /app/apps/api
COPY apps/api/package.json apps/api/package-lock.json ./
RUN npm ci
COPY apps/api/ ./
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app/apps/api

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY apps/api/package.json apps/api/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=api-build /app/apps/api/dist ./dist
COPY --from=web-build /app/apps/web/dist ../web/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "dist/server.js"]
