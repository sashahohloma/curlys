import { promises as fs } from 'fs';
import { Buffer } from 'buffer';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { default as got } from 'got';
import { default as sharp } from 'sharp';
import { ServerConfig } from '../../config/server.config';
import { ImagesEntity } from '../../database/entities/images.entity';
import { Limits } from '../../constants/limits.constants';

@Injectable()
export class ImagesService {

    private readonly entityManager: EntityManager;
    private readonly serverConfig: ServerConfig;

    constructor(
        entityManager: EntityManager,
        serverConfig: ServerConfig,
    ) {
        this.entityManager = entityManager;
        this.serverConfig = serverConfig;
    }

    private async writeImage(filename: string, content: Buffer): Promise<void> {
        const filePath = this.serverConfig.imagePath(filename);
        await fs.mkdir(this.serverConfig.imageFolder, { recursive: true });
        await fs.writeFile(filePath, content);
    }

    public async download(url: string): Promise<Buffer> {
        const response = await got(url, {
            method: 'get',
            responseType: 'buffer',
        });
        return response.body;
    }

    public convertToWEBP(image: Buffer): Promise<Buffer> {
        return sharp(image).resize(Limits.twoHundred).webp().toBuffer();
    }

    public async get(uuid: string): Promise<Buffer> {
        try {
            const filePath = this.serverConfig.imagePath(uuid);
            const buffer = await fs.readFile(filePath);
            return buffer;
        }
        catch (error) {
            throw new NotFoundException();
        }
    }

    public save(content: Buffer): Promise<ImagesEntity> {
        return this.entityManager.transaction(async(entityManager) => {
            const imageEntity = new ImagesEntity();
            const image = await entityManager.save<ImagesEntity>(imageEntity);

            await this.writeImage(image.uuid, content);
            return image;
        });
    }

    public async delete(uuid: string): Promise<void> {
        try {
            const filePath = this.serverConfig.imagePath(uuid);
            await fs.rm(filePath);
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}
