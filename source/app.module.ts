import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { RequestsModule } from './requests/requests.module';
import { InstagramModule } from './services/instagram/instagram.module';

@Module({
    imports: [
        ConfigModule,
        RequestsModule,
        InstagramModule,
    ],
})
export class AppModule {}
