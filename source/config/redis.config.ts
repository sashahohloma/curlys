import { Injectable } from '@nestjs/common';
import { IRedisConfigFactory, IRedisOptions } from '@sashahohloma/nestjs/modules/redis';
import { RedisOptions } from 'ioredis';
import { ConfigService } from './config.service';

@Injectable()
export class RedisConfig implements IRedisConfigFactory {

    readonly host: string;
    readonly port: number;
    readonly password: string;
    readonly index: number;

    constructor(configService: ConfigService) {
        this.host = configService.getString('REDIS_HOST');
        this.port = configService.getNumber('REDIS_PORT');
        this.password = configService.getString('REDIS_PASS');
        this.index = configService.getNumber('REDIS_INDEX');
    }

    public getConnection(): RedisOptions {
        return {
            host: this.host,
            port: this.port,
            password: this.password,
            db: this.index,
        };
    }

    public createRedisConfig(): IRedisOptions {
        return {
            config: this.getConnection(),
        };
    }
}
