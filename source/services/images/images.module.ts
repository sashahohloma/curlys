import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [
        ImagesService,
    ],
    controllers: [
        ImagesController,
    ],
    exports: [
        ImagesService,
    ],
})
export class ImagesModule {}
