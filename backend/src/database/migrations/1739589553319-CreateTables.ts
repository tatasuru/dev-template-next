import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739589553319 implements MigrationInterface {
    name = 'CreateTables1739589553319'

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
        await queryRunner.query(`
            CREATE TABLE "carts" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_items" (
                "id" SERIAL NOT NULL,
                "cart_id" integer NOT NULL,
                "recipe_id" integer NOT NULL,
                "quantity" integer NOT NULL,
                "special_request" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_item_customizations" (
                "id" SERIAL NOT NULL,
                "cart_item_id" integer NOT NULL,
                "customization_option_id" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d99ec427b0f2db332406d9f3fd7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."orders_status_enum" AS ENUM('preparing', 'ready', 'completed', 'cancelled')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."orders_payment_method_enum" AS ENUM('credit_card', 'cash', 'qr_code')
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" SERIAL NOT NULL,
                "status" "public"."orders_status_enum" NOT NULL DEFAULT 'preparing',
                "payment_method" "public"."orders_payment_method_enum" NOT NULL,
                "total_amount" integer NOT NULL,
                "discount_amount" integer NOT NULL DEFAULT '0',
                "final_amount" integer NOT NULL,
                "payment_details" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "orders"."id" IS 'オーダーID';
            COMMENT ON COLUMN "orders"."status" IS 'ステータス';
            COMMENT ON COLUMN "orders"."payment_method" IS '支払い方法';
            COMMENT ON COLUMN "orders"."total_amount" IS '合計金額';
            COMMENT ON COLUMN "orders"."discount_amount" IS '割引金額';
            COMMENT ON COLUMN "orders"."final_amount" IS '最終金額';
            COMMENT ON COLUMN "orders"."payment_details" IS '支払い詳細'
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_775c9f06fc27ae3ff8fb26f2c4" ON "orders" ("status")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c884e321f927d5b86aac7c8f9e" ON "orders" ("created_at")
        `);
        await queryRunner.query(`
            CREATE TABLE "order_customizations" (
                "id" SERIAL NOT NULL,
                "order_id" integer NOT NULL,
                "customization_option_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_24019cfcfa6e08edf026b31d255" PRIMARY KEY ("id")
            )
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
            CREATE TABLE "customization_categories" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "value" character varying(50) NOT NULL,
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
            CREATE TABLE "recipe_customizations" (
                "id" SERIAL NOT NULL,
                "recipe_id" integer NOT NULL,
                "customization_category_ids" integer array DEFAULT '{}',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_aee63fe16d9bc5bb1d46ab91f81" PRIMARY KEY ("id")
            )
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
            CREATE TABLE "recipe_customization_categories" (
                "recipe_customization_id" integer NOT NULL,
                "customization_category_id" integer NOT NULL,
                CONSTRAINT "PK_cb6ebca09301e6ddeb85c027c0b" PRIMARY KEY (
                    "recipe_customization_id",
                    "customization_category_id"
                )
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e5b49d9b1a68c60b54245b514e" ON "recipe_customization_categories" ("recipe_customization_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d6954b9a14c0e5d88449bd0bcd" ON "recipe_customization_categories" ("customization_category_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "carts"
            ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_items"
            ADD CONSTRAINT "FK_e28fe7e54dae0295a4b1086b4e5" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_items"
            ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_customizations"
            ADD CONSTRAINT "FK_2a5a123306ad86a9ca6e3922c79" FOREIGN KEY ("cart_item_id") REFERENCES "cart_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_customizations"
            ADD CONSTRAINT "FK_efa7c893bba534c29ec8bab9c99" FOREIGN KEY ("customization_option_id") REFERENCES "customization_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_customizations"
            ADD CONSTRAINT "FK_5fcac2d272f5a0bb608bfefbb59" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "recipes"
            ADD CONSTRAINT "FK_5be5ead33de507b1086b8e5678b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories"
            ADD CONSTRAINT "FK_e5b49d9b1a68c60b54245b514e5" FOREIGN KEY ("recipe_customization_id") REFERENCES "recipe_customizations"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories"
            ADD CONSTRAINT "FK_d6954b9a14c0e5d88449bd0bcde" FOREIGN KEY ("customization_category_id") REFERENCES "customization_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories" DROP CONSTRAINT "FK_d6954b9a14c0e5d88449bd0bcde"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories" DROP CONSTRAINT "FK_e5b49d9b1a68c60b54245b514e5"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes" DROP CONSTRAINT "FK_5be5ead33de507b1086b8e5678b"
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
            ALTER TABLE "order_customizations" DROP CONSTRAINT "FK_5fcac2d272f5a0bb608bfefbb59"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_customizations" DROP CONSTRAINT "FK_efa7c893bba534c29ec8bab9c99"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_customizations" DROP CONSTRAINT "FK_2a5a123306ad86a9ca6e3922c79"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_items" DROP CONSTRAINT "FK_e28fe7e54dae0295a4b1086b4e5"
        `);
        await queryRunner.query(`
            ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d6954b9a14c0e5d88449bd0bcd"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e5b49d9b1a68c60b54245b514e"
        `);
        await queryRunner.query(`
            DROP TABLE "recipe_customization_categories"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d3a7dac6f60f6ea4c4a721f71f"
        `);
        await queryRunner.query(`
            DROP TABLE "recipes"
        `);
        await queryRunner.query(`
            DROP TABLE "recipe_customizations"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_25e12dd5127befdf78fe959a1b"
        `);
        await queryRunner.query(`
            DROP TABLE "customization_categories"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b81e8cb7bf13a136010e6681e5"
        `);
        await queryRunner.query(`
            DROP TABLE "customization_options"
        `);
        await queryRunner.query(`
            DROP TABLE "order_customizations"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c884e321f927d5b86aac7c8f9e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_775c9f06fc27ae3ff8fb26f2c4"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."orders_payment_method_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."orders_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_item_customizations"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_items"
        `);
        await queryRunner.query(`
            DROP TABLE "carts"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_gender_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d9ac726b26f9d0f50f843742e6"
        `);
        await queryRunner.query(`
            DROP TABLE "categories"
        `);
    }

}
