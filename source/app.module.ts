import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { RequestsModule } from './requests/requests.module';

@Module({
    imports: [
        ConfigModule,
        RequestsModule,
    ],
})
export class AppModule {}
