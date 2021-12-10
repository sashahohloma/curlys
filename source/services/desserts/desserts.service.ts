import { Injectable, InternalServerErrorException, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { EntityManager, FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DessertsEntity } from '../../database/entities/desserts.entity';
import { ImagesService } from '../images/images.service';
import { DessertsFields } from './desserts.models';
import { DessertsMapper } from './desserts.mapper';

@Injectable()
export class DessertsService {

    private readonly logger: Logger;
    private readonly dessertsRepository: Repository<DessertsEntity>;
    private readonly imagesService: ImagesService;

    constructor(
        entityManager: EntityManager,
        imagesService: ImagesService,
    ) {
        this.logger = new Logger(DessertsService.name);
        this.dessertsRepository = entityManager.getRepository(DessertsEntity);
        this.imagesService = imagesService;
    }

    public async findOneOrFail(options: FindOneOptions<DessertsEntity>): Promise<DessertsEntity> {
        const dessert = await this.dessertsRepository.findOne(options);
        if (dessert === undefined) {
            throw new NotFoundException('Dessert was not found');
        }
        return dessert;
    }

    public getList(conditions?: FindConditions<DessertsEntity>): Promise<DessertsEntity[]> {
        return this.dessertsRepository.find({
            relations: ['images', 'rating'],
            where: {
                ...conditions,
                isPublic: true,
            },
        });
    }

    public async create(fields: DessertsFields, images: Express.Multer.File[]): Promise<void> {
        try {
            const dessert = await this.dessertsRepository.findOne({ slug: fields.slug });
            if (dessert !== undefined) {
                throw new ConflictException(`Dessert with slug "${fields.slug}" already exist`);
            }

            const dessertEntity = DessertsMapper.createEntity(fields);
            for (const multerFile of images) {
                const image = await this.imagesService.save(multerFile.buffer);
                dessertEntity.images.push(image);
            }
            await this.dessertsRepository.save(dessertEntity);
        }
        catch (error: unknown) {
            this.logger.error(error);
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async delete(uuid: string): Promise<void> {
        const dessert = await this.findOneOrFail({
            where: { uuid },
        });
        await this.dessertsRepository.update(uuid, {
            ...dessert,
            isPublic: false,
        });
    }

}
