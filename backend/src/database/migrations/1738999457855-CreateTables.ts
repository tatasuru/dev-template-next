import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1738999457855 implements MigrationInterface {
    name = 'CreateTables1738999457855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "customizationOptions" (
                "id" SERIAL NOT NULL,
                "customization_category_id" integer NOT NULL,
                "name" character varying(50) NOT NULL,
                "image_url" character varying(255),
                "additional_price" integer NOT NULL,
                "display_order" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7cccd8c79c46d1541070cda5c6d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dc91db33479e661198115353f0" ON "customizationOptions" ("display_order")
        `);
        await queryRunner.query(`
            CREATE TABLE "customizationCategories" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "display_order" integer NOT NULL,
                "multiple_select" boolean NOT NULL DEFAULT false,
                "required" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_034f675f603784fce5f49295141" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9a5fbc41ef32055b66987771c2" ON "customizationCategories" ("display_order")
        `);
        await queryRunner.query(`
            ALTER TABLE "customizationOptions"
            ADD CONSTRAINT "FK_638f26de1716d64fd96d258092c" FOREIGN KEY ("customization_category_id") REFERENCES "customizationCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customizationOptions" DROP CONSTRAINT "FK_638f26de1716d64fd96d258092c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9a5fbc41ef32055b66987771c2"
        `);
        await queryRunner.query(`
            DROP TABLE "customizationCategories"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_dc91db33479e661198115353f0"
        `);
        await queryRunner.query(`
            DROP TABLE "customizationOptions"
        `);
    }

}
