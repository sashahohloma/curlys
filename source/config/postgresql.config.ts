import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { TypeId } from './pg.types';
import { types } from 'pg';
import { DessertsEntity } from '../database/entities/desserts.entity';
import { ImagesEntity } from '../database/entities/images.entity';
import { InstagramEntity } from '../database/entities/instagram.entity';
import { ReviewsEntity } from '../database/entities/reviews.entity';
import { RatingEntity } from '../database/entities/rating.entity';

@Injectable()
export class PostgresqlConfig implements TypeOrmOptionsFactory {

    private readonly database: string;
    private readonly username: string;
    private readonly password: string;
    private readonly host: string;
    private readonly port: number;
    private readonly logging: boolean;

    constructor(configService: ConfigService) {
        this.database = configService.getString('TYPEORM_DATABASE');
        this.username = configService.getString('TYPEORM_USERNAME');
        this.password = configService.getString('TYPEORM_PASSWORD');
        this.host = configService.getString('TYPEORM_HOST');
        this.port = configService.getNumber('TYPEORM_PORT');
        this.logging = configService.getBoolean('TYPEORM_LOGGING');

        this.setTypings();
    }

    private setTypings(): void {
        types.setTypeParser(TypeId.INT8, 'text', parseInt);
        types.setTypeParser(TypeId.DATE, (v) => v);
        types.setTypeParser(TypeId.TIMESTAMP, (v) => v);
        types.setTypeParser(TypeId.TIMESTAMPTZ, (v) => v);
    }

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        const config: TypeOrmModuleOptions = {
            type: 'postgres',
            database: this.database,
            username: this.username,
            password: this.password,
            host: this.host,
            port: this.port,
            logging: this.logging,
            entities: [
                DessertsEntity,
                ImagesEntity,
                InstagramEntity,
                ReviewsEntity,
                RatingEntity,
            ],
            synchronize: true,
            useUTC: true,
        };
        return config;
    }
}
