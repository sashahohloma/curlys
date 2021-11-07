import { Get, Controller, Render } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { IMainPage } from './requests.models';

@Controller()
export class RequestsController {

    private readonly requestsService: RequestsService;

    constructor(requestsService: RequestsService) {
        this.requestsService = requestsService;
    }

    @Get()
    @Render('main')
    public async root(): Promise<IMainPage> {
        const content = await this.requestsService.main();
        return content;
    }

}
