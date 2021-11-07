import { MigrationInterface, QueryRunner } from 'typeorm';

export class TablesSeedsDesertsImages1636285121275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "curlys"."desserts_images" ("dessert_uuid", "image_uuid") VALUES
                ('5753c3fa-beee-4fbd-9788-790e6a2a6e4e', '86437c40-1c08-416b-b6d6-44dcfbb4b2d7'),
                ('69874c57-44e9-4b3c-a740-95e367fc4a31', 'd0a47789-b87c-4bd8-86be-881fa421f53d'),
                ('f79e8141-16b6-476c-8e0d-3b419da13fce', '06a3eae4-3bcb-44b2-a1a1-e99492bfbb41');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "curlys"."desserts_images"
            WHERE "dessert_uuid" IN (
                '5753c3fa-beee-4fbd-9788-790e6a2a6e4e',
                '69874c57-44e9-4b3c-a740-95e367fc4a31',
                'f79e8141-16b6-476c-8e0d-3b419da13fce'
            );
        `);
    }

}
