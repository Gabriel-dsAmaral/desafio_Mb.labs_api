import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1663633052388 implements MigrationInterface {
    name = 'initialMigration1663633052388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rateEvent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "eventId" uuid NOT NULL, "rate" integer NOT NULL, CONSTRAINT "PK_00fbbe3a56c3aedbb484f9fb3a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rateEvent" ADD CONSTRAINT "FK_c0bd610a665cc7d8dc5ee3d0b17" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rateEvent" ADD CONSTRAINT "FK_c898fcfafac29f5ab1da8b0d9a1" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rateEvent" DROP CONSTRAINT "FK_c898fcfafac29f5ab1da8b0d9a1"`);
        await queryRunner.query(`ALTER TABLE "rateEvent" DROP CONSTRAINT "FK_c0bd610a665cc7d8dc5ee3d0b17"`);
        await queryRunner.query(`DROP TABLE "rateEvent"`);
    }

}
