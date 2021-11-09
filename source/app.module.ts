import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@sashahohloma/nestjs/modules/redis';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './config/config.module';
import { PostgresqlConfig } from './config/postgresql.config';
import { RedisConfig } from './config/redis.config';
import { RequestsModule } from './requests/requests.module';
import { InstagramModule } from './services/instagram/instagram.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: PostgresqlConfig,
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: RedisConfig,
        }),
        ConfigModule,
        RequestsModule,
        InstagramModule,
    ],
})
export class AppModule {}
