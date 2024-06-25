import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1719342319228 implements MigrationInterface {
    name = 'SchemaUpdate1719342319228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "dateRelease" TIMESTAMP NOT NULL, "rating" integer NOT NULL, "site" character varying NOT NULL, "genreId" uuid, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_32c912a94790e9f282f63e72dd8" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_32c912a94790e9f282f63e72dd8"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
