import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739191843955 implements MigrationInterface {
    name = 'CreateTables1739191843955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_customizations" DROP CONSTRAINT "FK_e49dcd0750508b4a32182081650"
        `);
        await queryRunner.query(`
            CREATE TABLE "customization_options" (
                "id" SERIAL NOT NULL,
                "customization_category_id" integer NOT NULL,
                "name" character varying(50) NOT NULL,
                "image_url" character varying(255),
                "additional_price" integer NOT NULL,
                "display_order" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0c0169adb5af8ecb7cb1469b4eb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b81e8cb7bf13a136010e6681e5" ON "customization_options" ("display_order")
        `);
        await queryRunner.query(`
            CREATE TABLE "recipe_customizations" (
                "id" SERIAL NOT NULL,
                "recipe_id" integer NOT NULL,
                "customization_category_id" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_aee63fe16d9bc5bb1d46ab91f81" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "customization_categories" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "display_order" integer NOT NULL,
                "multiple_select" boolean NOT NULL DEFAULT false,
                "required" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d64d20b9f04e70754f0586e9495" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_25e12dd5127befdf78fe959a1b" ON "customization_categories" ("display_order")
        `);
        await queryRunner.query(`
            ALTER TABLE "order_customizations"
            ADD CONSTRAINT "FK_e49dcd0750508b4a32182081650" FOREIGN KEY ("customization_option_id") REFERENCES "customization_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "customization_options"
            ADD CONSTRAINT "FK_1b55eb779ed997a78255c74caa7" FOREIGN KEY ("customization_category_id") REFERENCES "customization_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customizations"
            ADD CONSTRAINT "FK_06d047b088783d2da3595085639" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customizations"
            ADD CONSTRAINT "FK_84e91ce9145b232491fcaf462a0" FOREIGN KEY ("customization_category_id") REFERENCES "customization_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipe_customizations" DROP CONSTRAINT "FK_84e91ce9145b232491fcaf462a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customizations" DROP CONSTRAINT "FK_06d047b088783d2da3595085639"
        `);
        await queryRunner.query(`
            ALTER TABLE "customization_options" DROP CONSTRAINT "FK_1b55eb779ed997a78255c74caa7"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_customizations" DROP CONSTRAINT "FK_e49dcd0750508b4a32182081650"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_25e12dd5127befdf78fe959a1b"
        `);
        await queryRunner.query(`
            DROP TABLE "customization_categories"
        `);
        await queryRunner.query(`
            DROP TABLE "recipe_customizations"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b81e8cb7bf13a136010e6681e5"
        `);
        await queryRunner.query(`
            DROP TABLE "customization_options"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_customizations"
            ADD CONSTRAINT "FK_e49dcd0750508b4a32182081650" FOREIGN KEY ("customization_option_id") REFERENCES "customizationOptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
