import { Injectable } from '@nestjs/common';
import { BusinessConfig } from '../config/business.config';
import { DessertsService } from '../services/desserts/desserts.service';
import { InstagramService } from '../services/instagram/instagram.service';
import { IMainPage } from './requests.models';

@Injectable()
export class RequestsService {

    private readonly businessConfig: BusinessConfig;
    private readonly dessertsService: DessertsService;
    private readonly instagramService: InstagramService;

    constructor(
        businessConfig: BusinessConfig,
        dessertsService: DessertsService,
        instagramService: InstagramService,
    ) {
        this.businessConfig = businessConfig;
        this.dessertsService = dessertsService;
        this.instagramService = instagramService;
    }

    public async main(): Promise<IMainPage> {
        const desserts = await this.dessertsService.get();
        const posts = await this.instagramService.getPosts();

        return {
            desserts,
            instagram: {
                username: this.businessConfig.instagram,
                posts,
            },
        };
    }

}
