import { Injectable } from '@nestjs/common';
import { DessertsService } from '../services/desserts/desserts.service';
import { IMainPage } from './requests.models';

@Injectable()
export class RequestsService {

    private readonly dessertsService: DessertsService;

    constructor(dessertsService: DessertsService) {
        this.dessertsService = dessertsService;
    }

    public async main(): Promise<IMainPage> {
        const desserts = await this.dessertsService.get();

        return {
            desserts,
        };
    }

}
