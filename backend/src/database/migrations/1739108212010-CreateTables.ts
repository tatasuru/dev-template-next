import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739108212010 implements MigrationInterface {
    name = 'CreateTables1739108212010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations" DROP CONSTRAINT "FK_fa4f104f42b0511768287fdddf8"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ADD "recipe_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations" DROP CONSTRAINT "FK_a0c460b980936fa9e5e1178048a"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ALTER COLUMN "customization_category_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ADD CONSTRAINT "FK_7df704e1c75fd331cfe9140cd17" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ADD CONSTRAINT "FK_a0c460b980936fa9e5e1178048a" FOREIGN KEY ("customization_category_id") REFERENCES "customizationCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations" DROP CONSTRAINT "FK_a0c460b980936fa9e5e1178048a"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations" DROP CONSTRAINT "FK_7df704e1c75fd331cfe9140cd17"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ALTER COLUMN "customization_category_id" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ADD CONSTRAINT "FK_a0c460b980936fa9e5e1178048a" FOREIGN KEY ("customization_category_id") REFERENCES "customizationCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations" DROP COLUMN "recipe_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "recipeCustomizations"
            ADD CONSTRAINT "FK_fa4f104f42b0511768287fdddf8" FOREIGN KEY ("id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
