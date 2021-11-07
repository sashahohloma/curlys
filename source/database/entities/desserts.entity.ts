import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Check, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { ImagesEntity } from './images.entity';
import { ReviewsEntity } from './reviews.entity';

@Entity({ schema: 'curlys', name: 'desserts' })
@Check('protein > 0')
@Check('fats > 0')
@Check('carbohydrates > 0')
@Check('calories > 0')
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
    public description: string;

    @Column({ type: 'int4', comment: 'белки' })
    public protein: number;

    @Column({ type: 'int4', comment: 'жиры' })
    public fats: number;

    @Column({ type: 'int4', comment: 'углеводы' })
    public carbohydrates: number;

    @Column({ type: 'int4', comment: 'калорийность' })
    public calories: number;

    @Column({ type: 'int2' })
    public quantity: number;

    @Column({ type: 'int4' })
    public price: number;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

    @ManyToMany(() => ImagesEntity)
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
    readonly images: ImagesEntity[];

    @OneToMany(() => ReviewsEntity, (reviews) => reviews.dessert)
    @JoinColumn({ name: 'uuid', referencedColumnName: 'dessert_uuid' })
    readonly reviews: ReviewsEntity[];

}
