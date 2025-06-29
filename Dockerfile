FROM oven/bun:alpine AS base




# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app


ARG DEBUG
ARG BACKEND_CORE_URL
ARG GIT_TAG
ARG NEXT_PUBLIC_URL

ENV DEBUG=$DEBUG
ENV GIT_TAG=$GIT_TAG
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV BACKEND_CORE_URL=$BACKEND_CORE_URL

COPY package.json yarn.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app


ARG DEBUG
ARG BACKEND_CORE_URL
ARG GIT_TAG
ARG NEXT_PUBLIC_URL

ENV NODE_ENV=production
ENV DEBUG=$DEBUG
ENV GIT_TAG=$GIT_TAG
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL

COPY --from=deps app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app

ARG DEBUG
ARG BACKEND_CORE_URL
ARG NEXT_PUBLIC_URL

ENV NODE_ENV=production
ENV DEBUG=$DEBUG
ENV BACKEND_CORE_URL=$BACKEND_CORE_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
COPY --from=builder app/public ./public
COPY --from=builder app/.next/standalone ./
COPY --from=builder app/.next/static ./.next/static

EXPOSE 3000
CMD ["bun", "run", "server.js"]
