import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1659058493979 implements MigrationInterface {
  name = "initialMigration1659058493979";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" integer NOT NULL, "zipCode" character varying NOT NULL, "district" character varying NOT NULL, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avaible_quantity" integer NOT NULL, "price" integer NOT NULL, "sold_amount" integer NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "user_name" character varying NOT NULL, "avatar_url" character varying NOT NULL, "banner_url" character varying NOT NULL, "is_superuser" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "owner_name" character varying NOT NULL, "banner_url" character varying NOT NULL, "icon_url" character varying NOT NULL, "is_remote" boolean NOT NULL, "description" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "addressId" uuid, "ticketsId" uuid, CONSTRAINT "REL_7319036dfa19ed2a62d4042a52" UNIQUE ("addressId"), CONSTRAINT "REL_d935ca3393bbd0b3d079d318ad" UNIQUE ("ticketsId"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_my_events_events" ("usersId" uuid NOT NULL, "eventsId" uuid NOT NULL, CONSTRAINT "PK_5698435516d3687ac7fff288b7a" PRIMARY KEY ("usersId", "eventsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d0fb24ccab350c5d885493c2b" ON "users_my_events_events" ("usersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af2f8547ee4e79f71659d3cccc" ON "users_my_events_events" ("eventsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_7319036dfa19ed2a62d4042a528" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_d935ca3393bbd0b3d079d318ad1" FOREIGN KEY ("ticketsId") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users_my_events_events" ADD CONSTRAINT "FK_4d0fb24ccab350c5d885493c2b7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "users_my_events_events" ADD CONSTRAINT "FK_af2f8547ee4e79f71659d3cccc0" FOREIGN KEY ("eventsId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `
                          INSERT INTO "users" ("user_name", "email", "password", "avatar_url", "banner_url", "is_superuser")
                          VALUES ('${process.env.ADMIN_NAME}','${
        process.env.ADMIN_EMAIL
      }','${hashSync(
        process.env.ADMIN_PASSWORD!,
        10
      )}','https://mobizent.net/wp-content/uploads/2018/04/Home-Four-Banner-Background-Image.png','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2csVHl_EBoGPADSH-4tF2g6NFnhWKDp72MA&usqp=CAU',true)
                        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_my_events_events" DROP CONSTRAINT "FK_af2f8547ee4e79f71659d3cccc0"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_my_events_events" DROP CONSTRAINT "FK_4d0fb24ccab350c5d885493c2b7"`
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_d935ca3393bbd0b3d079d318ad1"`
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_7319036dfa19ed2a62d4042a528"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af2f8547ee4e79f71659d3cccc"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4d0fb24ccab350c5d885493c2b"`
    );
    await queryRunner.query(`DROP TABLE "users_my_events_events"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tickets"`);
    await queryRunner.query(`DROP TABLE "adresses"`);
  }
}
