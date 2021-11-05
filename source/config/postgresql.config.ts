import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { TypeId } from './pg.types';
import { types } from 'pg';

@Injectable()
export class PostgresqlConfig implements TypeOrmOptionsFactory {

    readonly database: string;
    readonly username: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;

    constructor(configService: ConfigService) {
        this.database = configService.getString('PG_DATABASE');
        this.username = configService.getString('PG_USERNAME');
        this.password = configService.getString('PG_PASSWORD');
        this.host = configService.getString('PG_HOST');
        this.port = configService.getNumber('PG_PORT');

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
            useUTC: true,
            database: this.database,
            username: this.username,
            password: this.password,
            host: this.host,
            port: this.port,
        };
        return config;
    }
}
