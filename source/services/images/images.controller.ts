import { Get, Controller, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImagesGetDto } from './images.get.dto';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {

    private readonly imagesService: ImagesService;

    constructor(imagesService: ImagesService) {
        this.imagesService = imagesService;
    }

    @Get('image/:uuid')
    public async getImage(
        @Param() params: ImagesGetDto,
        @Res() res: Response,
    ): Promise<void> {
        const content = await this.imagesService.get(params.uuid);

        res.contentType('image/webp');
        res.end(content, 'binary');
    }

}
