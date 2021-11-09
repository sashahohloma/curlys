import { Module } from '@nestjs/common';
import { DessertsService } from './desserts.service';

@Module({
    providers: [
        DessertsService,
    ],
    exports: [
        DessertsService,
    ],
})
export class DessertsModule {}
