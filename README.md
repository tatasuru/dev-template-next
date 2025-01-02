# Getting Started

REF: [【Docker】初心者向け NestJS + Next.js の環境構築](https://qiita.com/tsuyuni/items/95551eb3d71be4ae79c8)

you can run below command for starting project.

## For frontend

move to frontend directory

```sh
cd frontend
```

docker build

```sh
docker compose up -d
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

docker build

```sh
docker compose up -d
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
