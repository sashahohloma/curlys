import { Post, Controller, Body, Version, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Get, Patch, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseJson } from '@sashahohloma/nestjs/modules/interceptors';
import { ReviewsEntity } from '../../database/entities/reviews.entity';
import { ReviewsCreateDto } from './dto/reviews.create.dto';
import { ReviewsPublishDto } from './dto/reviews.publish.dto';
import { ReviewsService } from './reviews.service';

@Controller()
@UseInterceptors(ResponseJson)
export class ReviewsController {

    private readonly reviewsService: ReviewsService;

    constructor(reviewsService: ReviewsService) {
        this.reviewsService = reviewsService;
    }

    @Version('1')
    @HttpCode(HttpStatus.OK)
    @Get('reviews/unpublish')
    public async getUnpublish(): Promise<ReviewsEntity[]> {
        const list = await this.reviewsService.getUnpublish();
        return list;
    }

    @Version('1')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseInterceptors(FileInterceptor('photo'))
    @Post('reviews/create')
    public async getUser(
        @Body() body: ReviewsCreateDto,
        @UploadedFile() file: Express.Multer.File | undefined,
    ): Promise<void> {
        await this.reviewsService.create(body, file);
    }

    @Version('1')
    @HttpCode(HttpStatus.OK)
    @Patch('reviews/publish')
    public async publish(@Query() query: ReviewsPublishDto): Promise<void> {
        await this.reviewsService.publish(query.uuid);
    }

}
