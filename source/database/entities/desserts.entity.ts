import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Check, CreateDateColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DessertsQuantity } from '../../services/desserts/desserts.models';
import { transformDecimal } from '../../shared/transformers/transformDecimal';
import { ImagesEntity } from './images.entity';
import { RatingEntity } from './rating.entity';
import { ReviewsEntity } from './reviews.entity';

@Entity({ schema: 'curlys', name: 'desserts' })
@Check('protein > 0 AND protein < 100')
@Check('fats > 0 AND fats < 100')
@Check('carbohydrates > 0 AND carbohydrates < 100')
@Check('calories > 0')
@Check('daily > 0 AND daily < 100')
@Check('weight > 0')
@Check('quantity = 2 OR quantity = 4 OR quantity = 6')
@Check('price > 0')
export class DessertsEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    public slug: string;

    @Column({ type: 'varchar', length: 100 })
    public name: string;

    @Column({ type: 'text' })
    public short_description: string;

    @Column({ type: 'text' })
    public full_description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: transformDecimal })
    public protein: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: transformDecimal })
    public fats: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: transformDecimal })
    public carbohydrates: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: transformDecimal })
    public calories: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, transformer: transformDecimal })
    public daily: number;

    @Column({ type: 'int4' })
    public weight: number;

    @Column({ type: 'text' })
    public storing: string;

    @Column({ type: 'int2' })
    public quantity: DessertsQuantity;

    @Column({ type: 'int4' })
    public price: number;

    @Column({ type: 'boolean', name: 'is_public', default: true })
    public isPublic: boolean;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

    @ManyToMany(() => ImagesEntity, { cascade: true })
    @JoinTable({
        schema: 'curlys',
        name: 'desserts_images',
        joinColumn: {
            name: 'dessert_uuid',
        },
        inverseJoinColumn: {
            name: 'image_uuid',
        },
    })
    public images: ImagesEntity[];

    @OneToMany(() => ReviewsEntity, (reviews) => reviews.dessert)
    @JoinColumn({ name: 'uuid', referencedColumnName: 'dessert_uuid' })
    public reviews: ReviewsEntity[];

    @OneToOne(() => RatingEntity, (rating) => rating.dessert, { nullable: true })
    public rating?: RatingEntity;

}
