# Getting Started

REF: [【Docker】初心者向け NestJS + Next.js の環境構築](https://qiita.com/tsuyuni/items/95551eb3d71be4ae79c8)

REF: [PostgreSQL と PgAdmin4 を Docker Compose で立ち上げる](https://zenn.dev/onozaty/articles/postgresql-pgadmin-container)

REF: [NestJS（Fastify） × TypeORM × PostgreSQL × Docker で環境構築](https://pote-chil.com/posts/nestjs-setup-typeorm-postgres)

you can run below command for starting project.

## setup

create container for frontend, backend, db, db-gui

```sh
docker compose up -d --build
```

## For frontend

move to frontend directory

```sh
cd frontend
```

docker bash

```sh
docker compose run --rm frontend bash
```

start project

```sh
pnpm dev
```

down bash container

```sh
exit
```

## For backend

move to frontend directory

```sh
cd backend
```

docker bash

```sh
docker compose run --rm backend bash
```

start project

```sh
pnpm start:dev
```

down bash container

```sh
exit
```

## For DB GUI

access to [http:localhost:8080](http:localhost:8080) and you will see admin dashboard
