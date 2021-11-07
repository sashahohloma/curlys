import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../../config/config.module';
import { PostgresqlConfig } from '../../config/postgresql.config';
import { DessertsService } from './desserts.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: PostgresqlConfig,
        }),
    ],
    providers: [
        DessertsService,
    ],
    exports: [
        DessertsService,
    ],
})
export class DessertsModule {}
