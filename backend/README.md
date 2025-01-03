# Getting Started

First, run the development server:

```bash
pnpm start:dev
```

## details

- fastify
- typeorm

## DB

- pgAdmin

## how to create entity

creating user entity example.

### 1.create users folder and resource

```sh
nest g res users --no-spec
```

```sh
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
```

### 2.create SQL migration file

```sh
npx typeorm-ts-node-commonjs migration:generate -d src/database/database-source.ts --pretty src/database/migrations/CreateUser
```

### 3.Execute SQL migration

create table in pgAdmin.

```sh
npx typeornpx typeorm-ts-node-commonjs migration:run -d src/database/database-source.ts
```
