import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Check, CreateDateColumn, ManyToOne } from 'typeorm';
import { DessertsEntity } from './desserts.entity';
import { ImagesEntity } from './images.entity';

@Entity({ schema: 'curlys', name: 'reviews' })
@Check('rating BETWEEN 1 AND 5')
export class ReviewsEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ type: 'varchar', length: 100 })
    public name: string;

    @Column({ type: 'int2' })
    public rating: number;

    @Column({ type: 'text' })
    public text: string;

    @Column({ type: 'boolean', name: 'is_public', default: false })
    public isPublic: boolean;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

    @OneToOne(() => ImagesEntity, { cascade: true, nullable: true })
    @JoinColumn({ name: 'photo_uuid', referencedColumnName: 'uuid' })
    public photo?: ImagesEntity;

    @ManyToOne(() => DessertsEntity, (dessert) => dessert.reviews)
    @JoinColumn({ name: 'dessert_uuid', referencedColumnName: 'uuid' })
    public dessert: DessertsEntity;

}
