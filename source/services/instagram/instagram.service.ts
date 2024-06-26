import { Injectable } from '@nestjs/common';
import { EntityManager, In, Repository } from 'typeorm';
import { default as instagram } from 'user-instagram';
import { Instagram, InstagramFields } from './instagram.models';
import { InstagramConfig } from '../../config/instagram.config';
import { InstagramMappers } from './instagram.mappers';
import { InstagramEntity } from '../../database/entities/instagram.entity';
import { ImagesService } from '../images/images.service';

@Injectable()
export class InstagramService {

    private isAuthenticated = false;

    private readonly entityManager: EntityManager;
    private readonly instagramRepository: Repository<InstagramEntity>;

    private readonly imagesService: ImagesService;

    private readonly username: string;
    private readonly password: string;

    constructor(
        entityManager: EntityManager,
        instagramConfig: InstagramConfig,
        imagesService: ImagesService,
    ) {
        this.entityManager = entityManager;
        this.instagramRepository = entityManager.getRepository(InstagramEntity);

        this.imagesService = imagesService;

        this.username = instagramConfig.username;
        this.password = instagramConfig.password;
    }

    private async authenticate(): Promise<void> {
        if (!this.isAuthenticated) {
            await instagram.authenticate(this.username, this.password);
            this.isAuthenticated = true;
        }
    }

    public async getUser(name: string): Promise<Instagram> {
        await this.authenticate();

        const userData = await instagram.getUserData(name);
        const userMapped = InstagramMappers.posts(userData);

        return userMapped;
    }

    public async getExistingShortcodes(shortcodes: string[]): Promise<Set<string>> {
        const list = await this.instagramRepository.find({
            where: { shortcode: In(shortcodes) },
        });
        return new Set(list.map(l => l.shortcode));
    }

    public async getPosts(): Promise<InstagramEntity[]> {
        const list = await this.instagramRepository.find({
            relations: ['photo'],
            order: { createdAt: 'DESC' },
            take: 4,
        });
        return list;
    }

    public async savePost(fields: InstagramFields): Promise<void> {
        const imageContent = await this.imagesService.download(fields.photoURL);
        const imageWebP = await this.imagesService.convertToWEBP(imageContent);

        await this.entityManager.transaction(async(entityManager) => {
            const instagramRepository = entityManager.getRepository(InstagramEntity);
            const imageEntity = await this.imagesService.save(imageWebP);

            const instagramEntity = new InstagramEntity();
            instagramEntity.shortcode = fields.shortcode;
            instagramEntity.createdAt = fields.createdAt;
            instagramEntity.photo = imageEntity;

            await instagramRepository.save(instagramEntity);
        });
    }

}
