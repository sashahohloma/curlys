import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerImagesOptions } from '../../shared/flies/multerImagesOptions';
import { DessertsModule } from '../desserts/desserts.module';
import { ImagesModule } from '../images/images.module';
import { RatingModule } from '../rating/rating.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
    imports: [
        MulterModule.register({
            ...multerImagesOptions,
        }),
        DessertsModule,
        RatingModule,
        ImagesModule,
    ],
    providers: [
        ReviewsService,
    ],
    controllers: [
        ReviewsController,
    ],
    exports: [
        ReviewsService,
    ],
})
export class ReviewsModule {}
