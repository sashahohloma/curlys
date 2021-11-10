import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ReviewsEntity } from '../../database/entities/reviews.entity';

@Injectable()
export class ReviewsService {

    private readonly reviewsRepository: Repository<ReviewsEntity>;

    constructor(entityManager: EntityManager) {
        this.reviewsRepository = entityManager.getRepository(ReviewsEntity);
    }

    public async getList(): Promise<ReviewsEntity[]> {
        const list = await this.reviewsRepository.find({
            relations: ['dessert', 'dessert.images'],
        });
        return list;
    }

    public async getDessertList(dessertUUID: string): Promise<ReviewsEntity[]> {
        const list = await this.reviewsRepository.find({
            where: { dessertUUID },
            relations: ['dessert'],
        });
        return list;
    }

}
