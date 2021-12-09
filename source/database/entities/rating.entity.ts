import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, Column, JoinColumn } from 'typeorm';
import { transformDecimal } from '../../shared/transformers/transformDecimal';
import { DessertsEntity } from './desserts.entity';

@Entity({ schema: 'curlys', name: 'rating' })
export class RatingEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: transformDecimal })
    public value: number;

    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: string;

    @OneToOne(() => DessertsEntity, (desserts) => desserts.rating, { nullable: false })
    @JoinColumn({ name: 'dessert_uuid', referencedColumnName: 'uuid' })
    public dessert: DessertsEntity;
}
