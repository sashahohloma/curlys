import { IsUUID } from 'class-validator';
import { ReviewsEntity } from '../../../database/entities/reviews.entity';

export class ReviewsPublishDto implements Pick<ReviewsEntity, 'uuid'> {

    @IsUUID()
    public uuid: string;

}
