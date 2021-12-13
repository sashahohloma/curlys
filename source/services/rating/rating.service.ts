import { Injectable } from '@nestjs/common';
import { integerOr } from '@sashahohloma/utilities';
import { EntityManager, Repository } from 'typeorm';
import { DessertsEntity } from '../../database/entities/desserts.entity';
import { RatingEntity } from '../../database/entities/rating.entity';
import { ReviewsEntity } from '../../database/entities/reviews.entity';
import { RatingMapper } from './rating.mapper';
import { RatingAverage } from './rating.models';

@Injectable()
export class RatingService {

    private readonly reviewsRepository: Repository<ReviewsEntity>;
    private readonly ratingRepository: Repository<RatingEntity>;

    constructor(entityManager: EntityManager) {
        this.reviewsRepository = entityManager.getRepository(ReviewsEntity);
        this.ratingRepository = entityManager.getRepository(RatingEntity);
    }

    private async getReviewsAVG(dessert: DessertsEntity): Promise<number> {
        const avg = await this.reviewsRepository
            .createQueryBuilder('r')
            .select('AVG(r.rating)', 'rating')
            .where({ dessert })
            .getRawOne<RatingAverage>();
        return integerOr(avg?.rating, 0);
    }

    public async update(dessert: DessertsEntity): Promise<void> {
        const rating = await this.ratingRepository.findOne({
            where: { dessert },
        });
        const avg = await this.getReviewsAVG(dessert);
        const ratingEntity = rating ?? RatingMapper.createEntity(avg, dessert);
        await this.ratingRepository.save(ratingEntity);
    }

}
