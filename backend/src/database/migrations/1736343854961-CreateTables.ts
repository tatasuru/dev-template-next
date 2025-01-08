import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1736343854961 implements MigrationInterface {
    name = 'CreateTables1736343854961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."items_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'DONE')
        `);
        await queryRunner.query(`
            CREATE TABLE "items" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "body" text NOT NULL,
                "status" "public"."items_status_enum" NOT NULL DEFAULT 'IN_PROGRESS',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "items"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."items_status_enum"
        `);
    }

}
