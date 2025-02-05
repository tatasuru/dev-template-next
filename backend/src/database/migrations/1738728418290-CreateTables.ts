import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1738728418290 implements MigrationInterface {
    name = 'CreateTables1738728418290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "display_order" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d9ac726b26f9d0f50f843742e6" ON "categories" ("display_order")
        `);
        await queryRunner.query(`
            CREATE TABLE "recipes" (
                "id" SERIAL NOT NULL,
                "category_id" integer NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" text,
                "base_price" integer NOT NULL,
                "calories" integer,
                "cooking_time" integer,
                "badge" character varying(50),
                "image_url" character varying(255),
                "is_sold_out" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d3a7dac6f60f6ea4c4a721f71f" ON "recipes" ("is_sold_out")
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes"
            ADD CONSTRAINT "FK_5be5ead33de507b1086b8e5678b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipes" DROP CONSTRAINT "FK_5be5ead33de507b1086b8e5678b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d3a7dac6f60f6ea4c4a721f71f"
        `);
        await queryRunner.query(`
            DROP TABLE "recipes"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d9ac726b26f9d0f50f843742e6"
        `);
        await queryRunner.query(`
            DROP TABLE "categories"
        `);
    }

}
