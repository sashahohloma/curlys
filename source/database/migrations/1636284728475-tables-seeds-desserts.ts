import { MigrationInterface, QueryRunner } from 'typeorm';

export class tablesSeedsDesserts1636284728475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "curlys"."desserts" ("uuid", "name", "description", "protein", "fats", "carbohydrates", "calories", "quantity", "price") VALUES
                ('5753c3fa-beee-4fbd-9788-790e6a2a6e4e', 'Морковный', 'Veniam impedit voluptatem libero officia fugit nobis explicabo tempora', 60, 120, 180, 240, 4, 800),
                ('69874c57-44e9-4b3c-a740-95e367fc4a31', 'Фруктовый', 'Quidem et eaque in exercitationem incidunt qui', 40, 80, 120, 160, 6, 1200),
                ('f79e8141-16b6-476c-8e0d-3b419da13fce', 'Сникерс', 'Maxime accusamus excepturi iusto quia placeat. Laudantium ea ut qui officiis modi et', 50, 100, 150, 200, 2, 400);
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
