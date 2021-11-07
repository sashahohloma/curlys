import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSeedsFile } from '../helpers/readSeedsFile';

export class TablesSeedsImages1636280780613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const dcfbbOriginal = await readSeedsFile('44dcfbb4b2d7-original.txt');
        const dcfbbThumbnail = await readSeedsFile('44dcfbb4b2d7-thumb.txt');
        const faOriginal = await readSeedsFile('881fa421f53d-original.txt');
        const faThumbnail = await readSeedsFile('881fa421f53d-thumb.txt');
        const bfbbOriginal = await readSeedsFile('e99492bfbb41-original.txt');
        const bfbbThumbnail = await readSeedsFile('e99492bfbb41-thumb.txt');

        const firstReview = await readSeedsFile('d3d4c5bc.txt');
        const secondReview = await readSeedsFile('7ed566e0.txt');
        const thirdReview = await readSeedsFile('dc6bb70c.txt');

        await queryRunner.query(`
            INSERT INTO "curlys"."images" ("uuid", "original", "thumbnail") VALUES
                ('86437c40-1c08-416b-b6d6-44dcfbb4b2d7', '${dcfbbOriginal}', '${dcfbbThumbnail}'),
                ('d0a47789-b87c-4bd8-86be-881fa421f53d', '${faOriginal}', '${faThumbnail}'),
                ('06a3eae4-3bcb-44b2-a1a1-e99492bfbb41', '${bfbbOriginal}', '${bfbbThumbnail}'),
                ('d3d4c5bc-4d45-4731-a942-0f6204ac1a47', '${firstReview}', '${firstReview}'),
                ('7ed566e0-d84d-40a5-bc05-09428ad524bc', '${secondReview}', '${secondReview}'),
                ('dc6bb70c-e85c-4169-8e43-0ec11745f533', '${thirdReview}', '${thirdReview}');
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
