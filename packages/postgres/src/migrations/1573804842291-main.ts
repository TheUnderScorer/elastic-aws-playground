import {MigrationInterface, QueryRunner} from "typeorm";

export class main1573804842291 implements MigrationInterface {
    name = 'main1573804842291'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "record_model" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d59450740568d2c9187de002b45" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "record_model"`, undefined);
    }

}
