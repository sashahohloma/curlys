import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from './config.service';
import { ServerConfig } from './server.config';
import { PostgresqlConfig } from './postgresql.config';
import { RedisConfig } from './redis.config';
import { HandlebarsConfig } from './handlebars.config';
import { BusinessConfig } from './business.config';
import { InstagramConfig } from './instagram.config';

@Module({
    imports: [
        NestConfig.ConfigModule.forRoot({
            cache: true,
            envFilePath: [
                '.env.development',
                '.env',
            ],
        }),
    ],
    providers: [
        NestConfig.ConfigService,
        ConfigService,
        ServerConfig,
        HandlebarsConfig,
        BusinessConfig,
        InstagramConfig,
        PostgresqlConfig,
        RedisConfig,
    ],
    exports: [
        ServerConfig,
        BusinessConfig,
        InstagramConfig,
        PostgresqlConfig,
        RedisConfig,
    ],
})
export class ConfigModule {}
