import { DessertsEntity } from '../../database/entities/desserts.entity';
import { ReviewsEntity } from '../../database/entities/reviews.entity';
import { ReviewsCreateDto } from './dto/reviews.create.dto';

export class ReviewsMapper {

    public static createEntity(fields: ReviewsCreateDto, dessert: DessertsEntity): ReviewsEntity {
        const entity = new ReviewsEntity();
        entity.name = fields.name;
        entity.rating = fields.rating;
        entity.text = fields.text;
        entity.isPublic = false;
        entity.dessert = dessert;
        return entity;
    }

}
