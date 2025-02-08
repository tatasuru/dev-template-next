FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN apk add bash && npm i -g @nestjs/cli pnpm

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "run", "start:dev"]
