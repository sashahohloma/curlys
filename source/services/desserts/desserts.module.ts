import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerDefaultOptions } from '../../shared/flies/multerDefaultOptions';
import { ImagesModule } from '../images/images.module';
import { DessertsController } from './desserts.controller';
import { DessertsService } from './desserts.service';

@Module({
    imports: [
        MulterModule.register({
            ...multerDefaultOptions,
        }),
        ImagesModule,
    ],
    providers: [
        DessertsService,
    ],
    controllers: [
        DessertsController,
    ],
    exports: [
        DessertsService,
    ],
})
export class DessertsModule {}
