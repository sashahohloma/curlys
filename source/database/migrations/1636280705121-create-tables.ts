import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1636280705121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE SCHEMA "curlys"');
        await queryRunner.query('CREATE TABLE "curlys"."images" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "original" text NOT NULL, "thumbnail" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5bd7999989d2a6bb88924613ba" PRIMARY KEY ("uuid"))');
        await queryRunner.query('CREATE TABLE "curlys"."desserts" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "protein" integer NOT NULL, "fats" integer NOT NULL, "carbohydrates" integer NOT NULL, "calories" integer NOT NULL, "quantity" smallint NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_82a97de313a8a2b83c178a108f" CHECK (price > 0), CONSTRAINT "CHK_63068c646d682d7ac25977dc58" CHECK (quantity = 2 OR quantity = 4 OR quantity = 6), CONSTRAINT "CHK_b0d4ecc28b6d93b52f70537116" CHECK (calories > 0), CONSTRAINT "CHK_b8ff1983e92d40ac14e63ecaa5" CHECK (carbohydrates > 0), CONSTRAINT "CHK_cb3f78a9cd617e8376b78c6bfb" CHECK (fats > 0), CONSTRAINT "CHK_6dcaf54984503c83146ad59387" CHECK (protein > 0), CONSTRAINT "PK_b36f294d5be92c08827042a0acd" PRIMARY KEY ("uuid")); COMMENT ON COLUMN "curlys"."desserts"."protein" IS \'белки\'; COMMENT ON COLUMN "curlys"."desserts"."fats" IS \'жиры\'; COMMENT ON COLUMN "curlys"."desserts"."carbohydrates" IS \'углеводы\'; COMMENT ON COLUMN "curlys"."desserts"."calories" IS \'калорийность\'');
        await queryRunner.query('CREATE TABLE "curlys"."reviews" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "photo_uuid" uuid, "rating" smallint NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_ac378d6d824b2ad91f1f2492bf" UNIQUE ("photo_uuid"), CONSTRAINT "CHK_5f4c2550e5fc2df5b18d7d3ada" CHECK (rating BETWEEN 1 AND 5), CONSTRAINT "PK_f2ccc5d85d7f3393c7f975395f7" PRIMARY KEY ("uuid"))');
        await queryRunner.query('CREATE TABLE "curlys"."desserts_images" ("dessert_uuid" uuid NOT NULL, "image_uuid" uuid NOT NULL, CONSTRAINT "PK_262bfcd32160540a9cc0d222ee4" PRIMARY KEY ("dessert_uuid", "image_uuid"))');
        await queryRunner.query('CREATE INDEX "IDX_3bbd6ab00e5d1e37844b3cb3b4" ON "curlys"."desserts_images" ("dessert_uuid") ');
        await queryRunner.query('CREATE INDEX "IDX_de20e347d64145d5e5d406424d" ON "curlys"."desserts_images" ("image_uuid") ');
        await queryRunner.query('ALTER TABLE "curlys"."reviews" ADD CONSTRAINT "FK_ac378d6d824b2ad91f1f2492bf7" FOREIGN KEY ("photo_uuid") REFERENCES "curlys"."images"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" ADD CONSTRAINT "FK_3bbd6ab00e5d1e37844b3cb3b4d" FOREIGN KEY ("dessert_uuid") REFERENCES "curlys"."desserts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" ADD CONSTRAINT "FK_de20e347d64145d5e5d406424dc" FOREIGN KEY ("image_uuid") REFERENCES "curlys"."images"("uuid") ON DELETE CASCADE ON UPDATE CASCADE');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" DROP CONSTRAINT "FK_de20e347d64145d5e5d406424dc"');
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" DROP CONSTRAINT "FK_3bbd6ab00e5d1e37844b3cb3b4d"');
        await queryRunner.query('ALTER TABLE "curlys"."reviews" DROP CONSTRAINT "FK_ac378d6d824b2ad91f1f2492bf7"');
        await queryRunner.query('DROP INDEX "curlys"."IDX_de20e347d64145d5e5d406424d"');
        await queryRunner.query('DROP INDEX "curlys"."IDX_3bbd6ab00e5d1e37844b3cb3b4"');
        await queryRunner.query('DROP TABLE "curlys"."desserts_images"');
        await queryRunner.query('DROP TABLE "curlys"."reviews"');
        await queryRunner.query('DROP TABLE "curlys"."desserts"');
        await queryRunner.query('DROP TABLE "curlys"."images"');
        await queryRunner.query('DROP SCHEMA "curlys" CASCADE');
    }

}
