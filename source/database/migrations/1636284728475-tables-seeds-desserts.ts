/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class tablesSeedsDesserts1636284728475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "curlys"."desserts" ("uuid", "name", "slug", "description", "protein", "fats", "carbohydrates", "calories", "quantity", "price") VALUES
                ('5753c3fa-beee-4fbd-9788-790e6a2a6e4e', 'Морковный с домашней карамелью', 'morkovniy-4', 'Earum voluptatem eveniet et quia velit sapiente in nesciunt ut nulla doloribus voluptatem rerum dolorem ipsa', 60, 120, 180, 240, 4, 800),
                ('69874c57-44e9-4b3c-a740-95e367fc4a31', 'Красный бархат с клубникой', 'fruktoviy-6', 'Ut sed earum ab. Sit eos aut maxime. Consequatur accusamus harum mollitia voluptatem consequuntur quos pariatur', 40, 80, 120, 160, 6, 1200),
                ('f79e8141-16b6-476c-8e0d-3b419da13fce', 'Шоколадный с арахисом и карамелью', 'snikers-2', 'Eos fugiat voluptatum vel ab incidunt quia voluptas. Praesentium repellendus dolore veniam omnis quia eaque nostrum reiciendis', 50, 100, 150, 200, 2, 400);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "curlys"."desserts"
            WHERE "uuid" IN (
                '5753c3fa-beee-4fbd-9788-790e6a2a6e4e',
                '69874c57-44e9-4b3c-a740-95e367fc4a31',
                'f79e8141-16b6-476c-8e0d-3b419da13fce'
            );
        `);
    }

}
