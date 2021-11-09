import { Buffer } from 'buffer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { default as got } from 'got';
import { default as sharp } from 'sharp';
import { ImagesEntity } from '../../database/entities/images.entity';
import { Limits } from '../../constants/limits.constants';

@Injectable()
export class ImagesService {

    private readonly imagesRepository: Repository<ImagesEntity>;

    constructor(entityManager: EntityManager) {
        this.imagesRepository = entityManager.getRepository(ImagesEntity);
    }

    public async download(url: string): Promise<Buffer> {
        const response = await got(url, {
            method: 'get',
            responseType: 'buffer',
        });
        return response.body;
    }

    public async convert(image: Buffer): Promise<Buffer> {
        const webp = await sharp(image).resize(Limits.twoHundred).webp().toBuffer();
        return webp;
    }

    public async save(content: Buffer): Promise<ImagesEntity> {
        const entity = new ImagesEntity();
        entity.content = content.toString('base64');

        const image = await this.imagesRepository.save(entity);
        return image;
    }

    public async get(uuid: string): Promise<Buffer> {
        const image = await this.imagesRepository.findOne({
            where: { uuid },
        });
        if (image === undefined) {
            throw new NotFoundException();
        }
        return Buffer.from(image.content, 'base64');
    }

}
