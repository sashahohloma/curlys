import { Injectable, NotFoundException } from '@nestjs/common';
import { integerFloat, integerOr } from '@sashahohloma/utilities';
import { EntityManager, Repository } from 'typeorm';
import { DessertsEntity } from '../../database/entities/desserts.entity';
import { ReviewsEntity } from '../../database/entities/reviews.entity';
import { IDesserts } from './desserts.models';

@Injectable()
export class DessertsService {

    private readonly dessertsRepository: Repository<DessertsEntity>;

    constructor(entityManager: EntityManager) {
        this.dessertsRepository = entityManager.getRepository(DessertsEntity);
    }

    public calculateRating(reviews: ReviewsEntity[]): number {
        const ratingSummary = reviews.reduce((acc, review) => acc + review.rating, 0);
        const ratingFloated = integerFloat(ratingSummary / reviews.length, 0);
        const rating = integerOr(ratingFloated, 0);
        return rating;
    }

    public async getAll(): Promise<IDesserts[]> {
        const desserts = await this.dessertsRepository.find({
            relations: ['images', 'reviews'],
        });
        const aggrDeserts = desserts.map<IDesserts>((d) => ({
            rating: this.calculateRating(d.reviews),
            ...d,
        }));
        return aggrDeserts;
    }

    public async findOneBySlugOrFail(slug: string): Promise<IDesserts> {
        try {

            const dessert = await this.dessertsRepository.findOneOrFail({
                relations: ['images', 'reviews', 'reviews.photo'],
                where: { slug },
            });
            const aggrDesert: IDesserts = {
                rating: this.calculateRating(dessert.reviews),
                ...dessert,
            };
            return aggrDesert;

        } catch (error) {
            throw new NotFoundException();
        }
    }

}
