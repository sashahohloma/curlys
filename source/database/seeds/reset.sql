DELETE FROM "curlys"."reviews"
WHERE "dessert_uuid" IN (
    '0e0d5fd7-8220-409b-9ac5-50ca6d0ad97c',
    '3d371a2e-6c56-4056-a952-91954542782b',
    'bf9ec217-95bd-41a4-8f28-a95d0998a983'
);

DELETE FROM "curlys"."desserts_images"
WHERE "dessert_uuid" IN (
    '5753c3fa-beee-4fbd-9788-790e6a2a6e4e',
    '69874c57-44e9-4b3c-a740-95e367fc4a31',
    'f79e8141-16b6-476c-8e0d-3b419da13fce'
);

DELETE FROM "curlys"."desserts"
WHERE "uuid" IN (
    '5753c3fa-beee-4fbd-9788-790e6a2a6e4e',
    '69874c57-44e9-4b3c-a740-95e367fc4a31',
    'f79e8141-16b6-476c-8e0d-3b419da13fce'
);

DELETE FROM "curlys"."images"
WHERE "uuid" IN (
    '86437c40-1c08-416b-b6d6-44dcfbb4b2d7',
    'd0a47789-b87c-4bd8-86be-881fa421f53d',
    '06a3eae4-3bcb-44b2-a1a1-e99492bfbb41',
    'd3d4c5bc-4d45-4731-a942-0f6204ac1a47',
    '7ed566e0-d84d-40a5-bc05-09428ad524bc',
    'dc6bb70c-e85c-4169-8e43-0ec11745f533'
);