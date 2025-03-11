import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1741694524842 implements MigrationInterface {
    name = 'CreateTables1741694524842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories" DROP CONSTRAINT "FK_d6954b9a14c0e5d88449bd0bcde"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "liff_user_id" text
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories"
            ADD CONSTRAINT "FK_d6954b9a14c0e5d88449bd0bcde" FOREIGN KEY ("customization_category_id") REFERENCES "customization_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories" DROP CONSTRAINT "FK_d6954b9a14c0e5d88449bd0bcde"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "liff_user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipe_customization_categories"
            ADD CONSTRAINT "FK_d6954b9a14c0e5d88449bd0bcde" FOREIGN KEY ("customization_category_id") REFERENCES "customization_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
