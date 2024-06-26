import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1719366956805 implements MigrationInterface {
    name = 'SchemaUpdate1719366956805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "dateRelease" TIMESTAMP NOT NULL, "rating" integer NOT NULL, "site" character varying NOT NULL, "genreId" uuid, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_32c912a94790e9f282f63e72dd8" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_32c912a94790e9f282f63e72dd8"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
