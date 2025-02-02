import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1738469360438 implements MigrationInterface {
    name = 'CreateTables1738469360438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" text NOT NULL,
                "phone_number" text NOT NULL,
                "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'MALE',
                "birth_date" text NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_gender_enum"
        `);
    }

}
