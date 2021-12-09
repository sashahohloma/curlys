import { DessertsEntity } from '../../database/entities/desserts.entity';
import { DessertsFields } from './desserts.models';

export class DessertsMapper {

    public static createEntity(fields: DessertsFields): DessertsEntity {
        const entity = new DessertsEntity();
        entity.slug = fields.slug;
        entity.name = fields.name;
        entity.short_description = fields.short_description;
        entity.full_description = fields.full_description;
        entity.protein = fields.protein;
        entity.fats = fields.fats;
        entity.carbohydrates = fields.carbohydrates;
        entity.calories = fields.calories;
        entity.daily = fields.daily;
        entity.weight = fields.weight;
        entity.storing = fields.storing;
        entity.quantity = fields.quantity;
        entity.price = fields.price;
        entity.images = [];
        return entity;
    }

}
