import { Module } from '@nestjs/common';
import { DessertsModule } from '../services/desserts/desserts.module';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
    imports: [
        DessertsModule,
    ],
    providers: [
        RequestsService,
    ],
    controllers: [
        RequestsController,
    ],
})
export class RequestsModule {}
