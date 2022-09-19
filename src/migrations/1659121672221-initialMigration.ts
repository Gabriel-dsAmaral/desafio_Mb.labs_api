import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1659121672221 implements MigrationInterface {
  name = "initialMigration1659121672221";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "adresses" ADD "city" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "city"`);
  }
}
