import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1636280705121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE SCHEMA "curlys"');
        await queryRunner.query('CREATE TABLE "curlys"."images" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5bd7999989d2a6bb88924613ba" PRIMARY KEY ("uuid"))');
        await queryRunner.query('CREATE TABLE "curlys"."rating" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "dessert_uuid" uuid NOT NULL, CONSTRAINT "REL_7774cea91db883ded1b7b26473" UNIQUE ("dessert_uuid"), CONSTRAINT "PK_548145228667df2bf825e620210" PRIMARY KEY ("uuid"))');
        await queryRunner.query('CREATE TABLE "curlys"."reviews" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "rating" smallint NOT NULL, "text" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "photo_uuid" uuid, "dessert_uuid" uuid, CONSTRAINT "REL_ac378d6d824b2ad91f1f2492bf" UNIQUE ("photo_uuid"), CONSTRAINT "CHK_5f4c2550e5fc2df5b18d7d3ada" CHECK (rating BETWEEN 1 AND 5), CONSTRAINT "PK_f2ccc5d85d7f3393c7f975395f7" PRIMARY KEY ("uuid"))');
        await queryRunner.query('CREATE TABLE "curlys"."desserts" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "short_description" text NOT NULL, "full_description" text NOT NULL, "protein" numeric(10,2) NOT NULL, "fats" numeric(10,2) NOT NULL, "carbohydrates" numeric(10,2) NOT NULL, "calories" numeric(10,2) NOT NULL, "daily" numeric(10,2) NOT NULL, "weight" integer NOT NULL, "storing" text NOT NULL, "quantity" smallint NOT NULL, "price" integer NOT NULL, "is_public" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe94ce2dcaac003ed859cdca511" UNIQUE ("slug"), CONSTRAINT "CHK_82a97de313a8a2b83c178a108f" CHECK (price > 0), CONSTRAINT "CHK_63068c646d682d7ac25977dc58" CHECK (quantity = 2 OR quantity = 4 OR quantity = 6), CONSTRAINT "CHK_4fd6f6d4717598006f272dd21d" CHECK (weight > 0), CONSTRAINT "CHK_b80a0a488b03695fbf355ed4a5" CHECK (daily > 0 AND daily < 100), CONSTRAINT "CHK_b0d4ecc28b6d93b52f70537116" CHECK (calories > 0), CONSTRAINT "CHK_fc8dcfda761bfb2a77eb97efc8" CHECK (carbohydrates > 0 AND carbohydrates < 100), CONSTRAINT "CHK_80578ac8ce83b55786811f9220" CHECK (fats > 0 AND fats < 100), CONSTRAINT "CHK_e672ac1043fee58e01f343f440" CHECK (protein > 0 AND protein < 100), CONSTRAINT "PK_b36f294d5be92c08827042a0acd" PRIMARY KEY ("uuid"))');
        await queryRunner.query('CREATE TABLE "curlys"."instagram" ("shortcode" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL, "photo_uuid" uuid NOT NULL, CONSTRAINT "REL_91aa4d7a1bb85d98220d0f2c3f" UNIQUE ("photo_uuid"), CONSTRAINT "PK_1a5ff75d027a2f9b2e53b50159e" PRIMARY KEY ("shortcode"))');
        await queryRunner.query('CREATE TABLE "curlys"."desserts_images" ("dessert_uuid" uuid NOT NULL, "image_uuid" uuid NOT NULL, CONSTRAINT "PK_262bfcd32160540a9cc0d222ee4" PRIMARY KEY ("dessert_uuid", "image_uuid"))');
        await queryRunner.query('CREATE INDEX "IDX_3bbd6ab00e5d1e37844b3cb3b4" ON "curlys"."desserts_images" ("dessert_uuid") ');
        await queryRunner.query('CREATE INDEX "IDX_de20e347d64145d5e5d406424d" ON "curlys"."desserts_images" ("image_uuid") ');
        await queryRunner.query('ALTER TABLE "curlys"."rating" ADD CONSTRAINT "FK_7774cea91db883ded1b7b264733" FOREIGN KEY ("dessert_uuid") REFERENCES "curlys"."desserts"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "curlys"."reviews" ADD CONSTRAINT "FK_ac378d6d824b2ad91f1f2492bf7" FOREIGN KEY ("photo_uuid") REFERENCES "curlys"."images"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "curlys"."reviews" ADD CONSTRAINT "FK_2fee35ec981b452180337c871c1" FOREIGN KEY ("dessert_uuid") REFERENCES "curlys"."desserts"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "curlys"."instagram" ADD CONSTRAINT "FK_91aa4d7a1bb85d98220d0f2c3fe" FOREIGN KEY ("photo_uuid") REFERENCES "curlys"."images"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" ADD CONSTRAINT "FK_3bbd6ab00e5d1e37844b3cb3b4d" FOREIGN KEY ("dessert_uuid") REFERENCES "curlys"."desserts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" ADD CONSTRAINT "FK_de20e347d64145d5e5d406424dc" FOREIGN KEY ("image_uuid") REFERENCES "curlys"."images"("uuid") ON DELETE CASCADE ON UPDATE CASCADE');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" DROP CONSTRAINT "FK_de20e347d64145d5e5d406424dc"');
        await queryRunner.query('ALTER TABLE "curlys"."desserts_images" DROP CONSTRAINT "FK_3bbd6ab00e5d1e37844b3cb3b4d"');
        await queryRunner.query('ALTER TABLE "curlys"."instagram" DROP CONSTRAINT "FK_91aa4d7a1bb85d98220d0f2c3fe"');
        await queryRunner.query('ALTER TABLE "curlys"."reviews" DROP CONSTRAINT "FK_2fee35ec981b452180337c871c1"');
        await queryRunner.query('ALTER TABLE "curlys"."reviews" DROP CONSTRAINT "FK_ac378d6d824b2ad91f1f2492bf7"');
        await queryRunner.query('ALTER TABLE "curlys"."rating" DROP CONSTRAINT "FK_7774cea91db883ded1b7b264733"');
        await queryRunner.query('DROP INDEX "curlys"."IDX_de20e347d64145d5e5d406424d"');
        await queryRunner.query('DROP INDEX "curlys"."IDX_3bbd6ab00e5d1e37844b3cb3b4"');
        await queryRunner.query('DROP TABLE "curlys"."desserts_images"');
        await queryRunner.query('DROP TABLE "curlys"."instagram"');
        await queryRunner.query('DROP TABLE "curlys"."desserts"');
        await queryRunner.query('DROP TABLE "curlys"."reviews"');
        await queryRunner.query('DROP TABLE "curlys"."rating"');
        await queryRunner.query('DROP TABLE "curlys"."images"');
        await queryRunner.query('DROP SCHEMA "curlys" CASCADE');
    }

}
