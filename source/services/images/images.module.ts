import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { ImagesService } from './images.service';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [
        ImagesService,
    ],
    exports: [
        ImagesService,
    ],
})
export class ImagesModule {}
