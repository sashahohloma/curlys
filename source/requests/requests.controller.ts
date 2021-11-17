import { Get, Controller, Render, Param } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { IMainPage, IProductPage } from './requests.models';
import { RequestsProductDto } from './requests.product.dto';

@Controller()
export class RequestsController {

    private readonly requestsService: RequestsService;

    constructor(requestsService: RequestsService) {
        this.requestsService = requestsService;
    }

    @Get()
    @Render('main')
    public async main(): Promise<IMainPage> {
        const content = await this.requestsService.main();
        return content;
    }

    @Get('product/:slug')
    @Render('product')
    public async product(@Param() params: RequestsProductDto): Promise<IProductPage> {
        const content = await this.requestsService.product(params.slug);
        return content;
    }

}
