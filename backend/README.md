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

## how to create api

REF: [NestJS(+ React.js)で簡単なTODOアプリを作ってみる](https://zenn.dev/red_frasco/articles/d5b7ec71ceacf6)

REF: [NestJS（Fastify） × TypeORM × PostgreSQL × Dockerで環境構築](https://pote-chil.com/posts/nestjs-setup-typeorm-postgres)

### Example of creation

#### ① execute below command

```sh
pnpm i -D @nestjs/cli
```

```sh
? Which package manager would you ❤️  to use?
  npm
  yarn
❯ pnpm
```

#### ② modify main.ts

change port number in **main.ts** to the same number as docker-compose.yaml.

```ts
await app.listen(8000, '0.0.0.0');
```

#### ③ create module

execute below command on directory.

```sh
pnpm nest g module user
```

this command creates user folder and user.module.ts and adds userModules into app.module.ts.

#### ④ create controller

```sh
pnpm nest g controller user --no-spec
```

this command creates user.controller.ts and adds Controller into app.modules.ts.

> [!TIP]
>
> `--no-spec` excludes test code generation.

#### ⑤ create service

```sh
pnpm nest g service user --no-spec
```

this command creates user.service.ts and adds Service into app.modules.ts.

### ⑥ use service from controller

first, add below code into user.service.ts.

```ts
export class UserService {
+ findAll() {
+   return 'findAll method called';
+ }
}
```

And, add below code into user.controller.ts.

```ts
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
+ import { UserService } from './user.service';

@Controller('user')
export class UserController {
+  constructor(private readonly userService: UserService) {}

+ @Get()
+ findAll() {
+   return this.userService.findAll();
+ }
}
```

Then, you can see message in [http://localhost:8000/user](http://localhost:8000/user).

## how to create DB Table

REF: [NestJS × TypeORM 0.3 でCLIからmigrationする](https://pote-chil.com/posts/nestjs-typeorm-migration)

REF: [Database | NestJS](https://docs.nestjs.com/techniques/database#database)
