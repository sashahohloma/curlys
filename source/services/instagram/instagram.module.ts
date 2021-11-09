import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ImagesModule } from '../images/images.module';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { InstagramQueue } from './instagram.queue';

@Module({
    imports: [
        ConfigModule,
        ImagesModule,
    ],
    providers: [
        InstagramService,
        InstagramQueue,
    ],
    controllers: [
        InstagramController,
    ],
    exports: [
        InstagramService,
    ],
})
export class InstagramModule {}
