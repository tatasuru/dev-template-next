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

### Example of api setup

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

### Example of api

#### ① create model

create user.model.ts on user directory and add below code.

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
```

#### ② edit user.service.ts

First of all, we develop create function.
Add below code into user.service.ts.

```ts
import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private user: User[] = [];

  findAll(): User[] {
    return this.user;
  }

  create(user: User) {
    this.user.push(user);
    return user;
  }
}
```

#### ③ edit user.controller.ts

Add below code into user.controller.ts.

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    return this.userService.create({
      id,
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
```

you can try to call api and confirm api working.
[http://0.0.0.0:8000/user](http://0.0.0.0:8000/user)

#### ④ add other api into service

You also add below code into user.service.ts under @Post code, then you can try to delete user.

```ts
@Delete(':id')
delete(@Param('id') id: string) {
  return this.userService.delete(id);
}
```

### Example of validation

#### ① create dto

We use Pipe validation, class-validator, and class-transformer, which are some of the main features of NestJS.

execute below command.

```sh
pnpm i uuid class-validator class-transformer
```

And create `dto` folder under user directory and create `create-user.ts`.

```ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  email: string;
}
```

#### ① modify main.ts

```ts
import { ValidationPipe } from '@nestjs/common';
....,
app.useGlobalPipes(new ValidationPipe());

await app.listen(8000, '0.0.0.0');
....
```

#### ② modify user.service.ts

modify `create` function in user.service.ts.

```ts
create(createUser: CreateUserDto): User {
  const newUser = {
    ...createUser,
    name: createUser.name,
    email: createUser.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  this.user.push(newUser);
  return newUser;
}
```

#### ③ modify user.controller.ts

modify `@Post` function in user.controller.ts.

```ts
@Post()
create(@Body() createUser: CreateUserDto): User {
  return this.userService.create(createUser);
}
```

#### ④ Pipe validation

...editing.

## how to create DB Table

REF: [NestJS × TypeORM 0.3 でCLIからmigrationする](https://pote-chil.com/posts/nestjs-typeorm-migration)

REF: [Database | NestJS](https://docs.nestjs.com/techniques/database#database)

### Example of migration

if you want to know about environment building, you should access [here](https://pote-chil.com/posts/nestjs-setup-typeorm-postgres).

Now, we will skip environment building.

#### ① create entity

Create `user.entity.ts` under user directory and add below code.

```ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

and execute below command.

```sh
mkdir -p src/database/migrations
```

we will create migration file using NestJS command in migrations folder later.

#### ② execute command

```sh
pnpm migration:generate
```

then, you can see src/database/migrations/CreateTables.
After that, execute below command.

```sh
pnpm migration:run
```

Now, you can see user table in pgAdmin.

> [!TIP]
>
> When it doesn't work, execute below command and rebuild docker container.
>
> ```sh
>  pnpm migration:drop
> ```
