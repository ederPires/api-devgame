import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRatingTypeToFloat1625838274000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "rating" TYPE float USING rating::float`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "rating" TYPE integer USING rating::integer`);
  }
}
