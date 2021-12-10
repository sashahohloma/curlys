import { DessertsEntity } from '../../database/entities/desserts.entity';

export enum DessertsQuantity {
    two = 2,
    four = 4,
    six =6,
}

export type DessertsFields = Omit<DessertsEntity, 'uuid' | 'createdAt' | 'images' | 'reviews'>;
