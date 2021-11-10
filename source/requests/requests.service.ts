import { Injectable } from '@nestjs/common';
import { BusinessConfig } from '../config/business.config';
import { DessertsService } from '../services/desserts/desserts.service';
import { InstagramService } from '../services/instagram/instagram.service';
import { ReviewsService } from '../services/reviews/reviews.service';
import { IMainPage } from './requests.models';

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

    public async main(): Promise<IMainPage> {
        const desserts = await this.dessertsService.get();
        const posts = await this.instagramService.getPosts();
        const reviews = await this.reviewsService.getList();

        return {
            desserts,
            reviews,
            instagram: {
                username: this.businessConfig.instagram,
                posts,
            },
        };
    }

}
