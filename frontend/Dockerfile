FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN apk add bash && npm i -g pnpm

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "dev"]
