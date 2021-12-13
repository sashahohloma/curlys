import { integerFloat } from '@sashahohloma/utilities';
import { DessertsEntity } from '../../database/entities/desserts.entity';
import { RatingEntity } from '../../database/entities/rating.entity';

export class RatingMapper {

    public static createEntity(value: number, dessert: DessertsEntity): RatingEntity {
        const entity = new RatingEntity();
        entity.value = integerFloat(value, 1);
        entity.dessert = dessert;
        return entity;
    }

}
