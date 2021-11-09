import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueuesBase, Job } from '@sashahohloma/nestjs/modules/queues';
import { RedisConfig } from '../../config/redis.config';
import { INSTAGRAM_KEY } from './instagram.models';
import { BusinessConfig } from '../../config/business.config';
import { InstagramService } from './instagram.service';

@Injectable()
export class InstagramQueue extends QueuesBase<string, void> {

    private readonly businessConfig: BusinessConfig;
    private readonly instagramService: InstagramService;

    constructor(
        redisConfig: RedisConfig,
        businessConfig: BusinessConfig,
        instagramService: InstagramService,
    ) {
        super({
            logger: new Logger(InstagramQueue.name),
            name: INSTAGRAM_KEY,
            connection: redisConfig.getConnection(),
            processor: (job: Job) => this.processor(job),
        });
        this.businessConfig = businessConfig;
        this.instagramService = instagramService;
    }

    private async processor(job: Job<string, void>): Promise<void> {
        const instagram = await this.instagramService.getUser(job.data);

        const shortcodes = instagram.posts.map(p => p.shortcode);
        const existsingShortcodes = await this.instagramService.getExistingShortcodes(shortcodes);

        for (const postItem of instagram.posts) {
            if (!existsingShortcodes.has(postItem.shortcode)) {
                await this.instagramService.savePost({
                    shortcode: postItem.shortcode,
                    photoURL: postItem.thumbnailSrc,
                    createdAt: postItem.createdAt,
                });
            }
        }
    }

    @Cron(CronExpression.EVERY_4_HOURS)
    public async fill(): Promise<void> {
        try {

            await this.queue.add(INSTAGRAM_KEY, this.businessConfig.instagram, {
                attempts: 1,
            });

        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

}
