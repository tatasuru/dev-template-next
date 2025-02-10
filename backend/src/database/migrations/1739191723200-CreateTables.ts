import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739191723200 implements MigrationInterface {
    name = 'CreateTables1739191723200'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            ALTER TABLE "order_customizations"
            ADD CONSTRAINT "FK_5fcac2d272f5a0bb608bfefbb59" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_customizations"
            ADD CONSTRAINT "FK_e49dcd0750508b4a32182081650" FOREIGN KEY ("customization_option_id") REFERENCES "customizationOptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_customizations" DROP CONSTRAINT "FK_e49dcd0750508b4a32182081650"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_customizations" DROP CONSTRAINT "FK_5fcac2d272f5a0bb608bfefbb59"
        `);
        await queryRunner.query(`
            DROP TABLE "order_customizations"
        `);
    }

}
