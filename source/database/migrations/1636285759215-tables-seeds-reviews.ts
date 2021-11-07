/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class tablesSeedsReviews1636285759215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "curlys"."reviews" ("uuid", "name", "photo_uuid", "rating", "text") VALUES
                ('0e0d5fd7-8220-409b-9ac5-50ca6d0ad97c', 'Рената', 'dc6bb70c-e85c-4169-8e43-0ec11745f533', 5, 'Это самый вкусный трайфл‚ который я когда-либо пробовала! Кто с Пятигорска, обязательно попробуйте'),
                ('3d371a2e-6c56-4056-a952-91954542782b', 'Танзиля Картоева', 'd3d4c5bc-4d45-4731-a942-0f6204ac1a47', 5, 'Это самый вкусный трайфл‚ который я когда-либо пробовала! Кто с Пятигорска, обязательно попробуйте'),
                ('bf9ec217-95bd-41a4-8f28-a95d0998a983', 'Екатерина', '7ed566e0-d84d-40a5-bc05-09428ad524bc', 5, 'Это самый вкусный трайфл‚ который я когда-либо пробовала! Кто с Пятигорска, обязательно попробуйте');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "curlys"."reviews"
            WHERE "dessert_uuid" IN (
                '0e0d5fd7-8220-409b-9ac5-50ca6d0ad97c',
                '3d371a2e-6c56-4056-a952-91954542782b',
                'bf9ec217-95bd-41a4-8f28-a95d0998a983'
            );
        `);
    }

}
