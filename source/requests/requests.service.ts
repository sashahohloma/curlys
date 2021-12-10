import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { BusinessConfig } from '../config/business.config';
import { DessertsService } from '../services/desserts/desserts.service';
import { InstagramService } from '../services/instagram/instagram.service';
import { ReviewsService } from '../services/reviews/reviews.service';
import { ICommonPage, IMainPage, IProductPage } from './requests.models';

@Injectable()
export class RequestsService {

    private readonly businessConfig: BusinessConfig;
    private readonly dessertsService: DessertsService;
    private readonly reviewsService: ReviewsService;
    private readonly instagramService: InstagramService;

    constructor(
        businessConfig: BusinessConfig,
        dessertsService: DessertsService,
        reviewsService: ReviewsService,
        instagramService: InstagramService,
    ) {
        this.businessConfig = businessConfig;
        this.dessertsService = dessertsService;
        this.reviewsService = reviewsService;
        this.instagramService = instagramService;
    }

    private async common(): Promise<ICommonPage> {
        const posts = await this.instagramService.getPosts();
        const reviews = await this.reviewsService.getList();

        return {
            reviews,
            instagram: {
                username: this.businessConfig.instagram,
                posts,
            },
        };
    }

    public async main(): Promise<IMainPage> {
        const desserts = await this.dessertsService.getList();
        const common = await this.common();

        return {
            desserts,
            ...common,
        };
    }

    public async product(slug: string): Promise<IProductPage> {
        const dessert = await this.dessertsService.findOneOrFail({
            relations: ['images', 'reviews', 'reviews.photo', 'rating'],
            where: { slug },
        });
        const related = await this.dessertsService.getList({
            slug: Not(slug),
        });
        const common = await this.common();

        return {
            dessert,
            related,
            ...common,
        };
    }

}
