import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { DessertsEntity } from '../../database/entities/desserts.entity';
import { ReviewsEntity } from '../../database/entities/reviews.entity';
import { DessertsService } from '../desserts/desserts.service';
import { ImagesService } from '../images/images.service';
import { RatingService } from '../rating/rating.service';
import { ReviewsCreateDto } from './dto/reviews.create.dto';
import { ReviewsMapper } from './reviews.mapper';

@Injectable()
export class ReviewsService {

    private readonly reviewsRepository: Repository<ReviewsEntity>;
    private readonly dessertsService: DessertsService;
    private readonly ratingService: RatingService;
    private readonly imagesService: ImagesService;

    constructor(
        entityManager: EntityManager,
        dessertsService: DessertsService,
        ratingService: RatingService,
        imagesService: ImagesService,
    ) {
        this.reviewsRepository = entityManager.getRepository(ReviewsEntity);
        this.dessertsService = dessertsService;
        this.ratingService = ratingService;
        this.imagesService = imagesService;
    }

    public async findOneOrFail(options: FindOneOptions<ReviewsEntity>): Promise<ReviewsEntity> {
        const review = await this.reviewsRepository.findOne(options);
        if (review === undefined) {
            throw new NotFoundException('Review was not found');
        }
        return review;
    }

    public async create(fields: ReviewsCreateDto, file?: Express.Multer.File): Promise<void> {
        const dessert = await this.dessertsService.findOneOrFail({
            where: { slug: fields.slug },
        });
        const reviewEntity = ReviewsMapper.createEntity(fields, dessert);
        if (file !== undefined) {
            const image = await this.imagesService.save(file.buffer);
            reviewEntity.photo = image;
        }
        await this.reviewsRepository.save(reviewEntity);
    }

    public async publish(reviewUUID: string): Promise<void> {
        const review = await this.findOneOrFail({
            relations: ['dessert'],
            where: { uuid: reviewUUID },
        });
        await this.reviewsRepository.save({
            ...review,
            isPublic: true,
        });
        await this.ratingService.update(review.dessert);
    }

    public getByDessert(dessert: DessertsEntity): Promise<ReviewsEntity[]> {
        return this.reviewsRepository.find({
            relations: ['photo'],
            where: {
                dessert,
                isPublic: true,
            },
        });
    }

    public async getListWithDessert(): Promise<ReviewsEntity[]> {
        const list = await this.reviewsRepository.find({
            relations: ['dessert', 'dessert.images', 'photo'],
            where: { isPublic: true },
        });
        return list;
    }

    public async getUnpublish(): Promise<ReviewsEntity[]> {
        const list = await this.reviewsRepository.find({
            where: { isPublic: false },
        });
        return list;
    }

}
