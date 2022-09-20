import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1663632818715 implements MigrationInterface {
    name = 'initialMigration1663632818715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "commentEvents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "eventId" uuid NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_01505ff9445992fdc5e3819b60d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD "average_rate" integer NOT NULL DEFAULT '5'`);
        await queryRunner.query(`ALTER TABLE "commentEvents" ADD CONSTRAINT "FK_a4827ae934dbb57aa671ff90bd8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentEvents" ADD CONSTRAINT "FK_70db3be2f3c4aad7cf50a8757b4" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commentEvents" DROP CONSTRAINT "FK_70db3be2f3c4aad7cf50a8757b4"`);
        await queryRunner.query(`ALTER TABLE "commentEvents" DROP CONSTRAINT "FK_a4827ae934dbb57aa671ff90bd8"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "average_rate"`);
        await queryRunner.query(`DROP TABLE "commentEvents"`);
    }

}
