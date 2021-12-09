-- IMAGES
INSERT INTO "curlys"."images" ("uuid") VALUES
    ('86437c40-1c08-416b-b6d6-44dcfbb4b2d7'),
    ('d0a47789-b87c-4bd8-86be-881fa421f53d'),
    ('06a3eae4-3bcb-44b2-a1a1-e99492bfbb41'),
    ('d3d4c5bc-4d45-4731-a942-0f6204ac1a47'),
    ('7ed566e0-d84d-40a5-bc05-09428ad524bc'),
    ('dc6bb70c-e85c-4169-8e43-0ec11745f533');

-- DESSERTS
INSERT INTO "curlys"."desserts" ("uuid", "name", "slug", "description", "protein", "fats", "carbohydrates", "calories", "dayly", "storage", "quantity", "price") VALUES
    ('5753c3fa-beee-4fbd-9788-790e6a2a6e4e', 'Морковный с домашней карамелью', 'morkovniy-4', 'Earum voluptatem eveniet et quia velit sapiente in nesciunt ut nulla doloribus voluptatem rerum dolorem ipsa', 60, 120, 180, 240, 22.9, 'хранить при температуре воздуха от +2 °C  до +6 °C , предельный срок хранения 96 часов (4 суток)', 4, 800),
    ('69874c57-44e9-4b3c-a740-95e367fc4a31', 'Красный бархат с клубникой', 'fruktoviy-6', 'Ut sed earum ab. Sit eos aut maxime. Consequatur accusamus harum mollitia voluptatem consequuntur quos pariatur', 40, 80, 120, 160, 22.9, 'хранить при температуре воздуха от +2 °C  до +6 °C , предельный срок хранения 96 часов (4 суток)', 6, 1200),
    ('f79e8141-16b6-476c-8e0d-3b419da13fce', 'Шоколадный с арахисом и карамелью', 'snikers-2', 'Eos fugiat voluptatum vel ab incidunt quia voluptas. Praesentium repellendus dolore veniam omnis quia eaque nostrum reiciendis', 50, 100, 150, 200, 22.9, 'хранить при температуре воздуха от +2 °C  до +6 °C , предельный срок хранения 96 часов (4 суток)', 2, 400);

-- DESSERTS IMAGES
INSERT INTO "curlys"."desserts_images" ("dessert_uuid", "image_uuid") VALUES
    ('5753c3fa-beee-4fbd-9788-790e6a2a6e4e', '86437c40-1c08-416b-b6d6-44dcfbb4b2d7'),
    ('69874c57-44e9-4b3c-a740-95e367fc4a31', 'd0a47789-b87c-4bd8-86be-881fa421f53d'),
    ('f79e8141-16b6-476c-8e0d-3b419da13fce', '06a3eae4-3bcb-44b2-a1a1-e99492bfbb41');

-- REVIEWS
INSERT INTO "curlys"."reviews" ("uuid", "name", "photo_uuid", "dessert_uuid", "rating", "text") VALUES
    ('0e0d5fd7-8220-409b-9ac5-50ca6d0ad97c', 'Рената', 'dc6bb70c-e85c-4169-8e43-0ec11745f533', '5753c3fa-beee-4fbd-9788-790e6a2a6e4e', 5, 'Это самый вкусный трайфл‚ который я когда-либо пробовала! Кто с Пятигорска, обязательно попробуйте'),
    ('3d371a2e-6c56-4056-a952-91954542782b', 'Танзиля Картоева', 'd3d4c5bc-4d45-4731-a942-0f6204ac1a47', '69874c57-44e9-4b3c-a740-95e367fc4a31', 5, 'Это самый вкусный трайфл‚ который я когда-либо пробовала! Кто с Пятигорска, обязательно попробуйте'),
    ('bf9ec217-95bd-41a4-8f28-a95d0998a983', 'Екатерина', '7ed566e0-d84d-40a5-bc05-09428ad524bc', 'f79e8141-16b6-476c-8e0d-3b419da13fce', 5, 'Это самый вкусный трайфл‚ который я когда-либо пробовала! Кто с Пятигорска, обязательно попробуйте');