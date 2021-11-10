import { MigrationInterface, QueryRunner } from 'typeorm';
export class TablesSeedsImages1636280780613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO "curlys"."images" ("uuid") VALUES
                ('86437c40-1c08-416b-b6d6-44dcfbb4b2d7'),
                ('d0a47789-b87c-4bd8-86be-881fa421f53d'),
                ('06a3eae4-3bcb-44b2-a1a1-e99492bfbb41'),
                ('d3d4c5bc-4d45-4731-a942-0f6204ac1a47'),
                ('7ed566e0-d84d-40a5-bc05-09428ad524bc'),
                ('dc6bb70c-e85c-4169-8e43-0ec11745f533');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "curlys"."images"
            WHERE "uuid" IN (
                '86437c40-1c08-416b-b6d6-44dcfbb4b2d7',
                'd0a47789-b87c-4bd8-86be-881fa421f53d',
                '06a3eae4-3bcb-44b2-a1a1-e99492bfbb41',
                'd3d4c5bc-4d45-4731-a942-0f6204ac1a47',
                '7ed566e0-d84d-40a5-bc05-09428ad524bc',
                'dc6bb70c-e85c-4169-8e43-0ec11745f533'
            );
        `);
    }

}
