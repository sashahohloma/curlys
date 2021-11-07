import { Injectable } from '@nestjs/common';
import { integerFloat, integerOr } from '@sashahohloma/utilities';
import { EntityManager, Repository } from 'typeorm';
import { DessertsEntity } from '../../database/entities/desserts.entity';
import { IDesserts } from './desserts.models';

@Injectable()
export class DessertsService {

    private readonly dessertsRepository: Repository<DessertsEntity>;

    constructor(entityManager: EntityManager) {
        this.dessertsRepository = entityManager.getRepository(DessertsEntity);
    }

    public async get(): Promise<IDesserts[]> {
        const desserts = await this.dessertsRepository.find({
            relations: ['images', 'reviews'],
        });
        const aggrDeserts = desserts.map<IDesserts>((d) => {
            const ratingSummary = d.reviews.reduce((acc, review) => acc + review.rating, 0);
            const ratingFloated = integerFloat(ratingSummary / d.reviews.length, 0);
            const rating = integerOr(ratingFloated, 0);
            return { ...d, rating };
        });
        return aggrDeserts;
    }

}
