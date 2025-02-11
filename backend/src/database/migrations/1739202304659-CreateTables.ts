import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739202304659 implements MigrationInterface {
    name = 'CreateTables1739202304659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customization_categories"
            ADD "value" character varying(50)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customization_categories" DROP COLUMN "value"
        `);
    }

}
