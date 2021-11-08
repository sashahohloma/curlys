import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { RedisModule } from '@sashahohloma/nestjs/modules/redis';
import { RedisConfig } from '../../config/redis.config';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: RedisConfig,
        }),
    ],
    providers: [
        InstagramService,
    ],
    controllers: [
        InstagramController,
    ],
})
export class InstagramModule {}
