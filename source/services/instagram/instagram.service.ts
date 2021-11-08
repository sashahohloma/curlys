import { Injectable } from '@nestjs/common';
import { InjectRedis, RedisService } from '@sashahohloma/nestjs/modules/redis';
import { default as got } from 'got';
import { INSTAGRAM_CACHE } from './instagram.models';
import { Hours } from '../../constants/times.constants';

@Injectable()
export class InstagramService {

    private readonly redisService: RedisService;

    constructor(@InjectRedis() redisService: RedisService) {
        this.redisService = redisService;
    }

    public getUser(name: string): Promise<string> {
        const cacheKey = this.redisService.makeKey(INSTAGRAM_CACHE, name);
        return this.redisService.getCachedOr(cacheKey, async() => {

            const url = 'https://www.instagram.com/' + name;
            const response = await got(url, {
                method: 'get',
                searchParams: { __a: 1 },
            });
            return response.body;

        }, Hours.four);
    }

}
