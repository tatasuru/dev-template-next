import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739100438620 implements MigrationInterface {
    name = 'CreateTables1739100438620'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            ALTER TABLE "recipes"
            ADD CONSTRAINT "FK_5be5ead33de507b1086b8e5678b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "customizationOptions"
            ADD CONSTRAINT "FK_638f26de1716d64fd96d258092c" FOREIGN KEY ("customization_category_id") REFERENCES "customizationCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"
        `);
        await queryRunner.query(`
            ALTER TABLE "customizationOptions" DROP CONSTRAINT "FK_638f26de1716d64fd96d258092c"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipes" DROP CONSTRAINT "FK_5be5ead33de507b1086b8e5678b"
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
            DROP INDEX "public"."IDX_dc91db33479e661198115353f0"
        `);
        await queryRunner.query(`
            DROP TABLE "customizationOptions"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9a5fbc41ef32055b66987771c2"
        `);
        await queryRunner.query(`
            DROP TABLE "customizationCategories"
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
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d3a7dac6f60f6ea4c4a721f71f"
        `);
        await queryRunner.query(`
            DROP TABLE "recipes"
        `);
    }

}
