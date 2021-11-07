import { DessertsEntity } from '../../database/entities/desserts.entity';

export interface IDesserts extends DessertsEntity {
    rating: number;
}
