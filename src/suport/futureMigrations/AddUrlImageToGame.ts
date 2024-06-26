import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUrlImageToGame1625838274000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" ADD "urlImage" varchar NOT NULL DEFAULT 'http://www.drive.com.br/image.jpg'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "urlImage"`);
  }
}
