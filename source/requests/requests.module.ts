import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DessertsModule } from '../services/desserts/desserts.module';
import { InstagramModule } from '../services/instagram/instagram.module';
import { ReviewsModule } from '../services/reviews/reviews.module';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
    imports: [
        ConfigModule,
        DessertsModule,
        InstagramModule,
        ReviewsModule,
    ],
    providers: [
        RequestsService,
    ],
    controllers: [
        RequestsController,
    ],
})
export class RequestsModule {}
