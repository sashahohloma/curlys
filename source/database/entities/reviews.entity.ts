import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Check, CreateDateColumn } from 'typeorm';
import { ImagesEntity } from './images.entity';

@Entity({ schema: 'curlys', name: 'reviews' })
@Check('rating BETWEEN 1 AND 5')
export class ReviewsEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ type: 'varchar', length: 100 })
    public name: string;

    @Column({ type: 'uuid', name: 'photo_uuid', nullable: true })
    public photoUUID?: string;

    @Column({ type: 'int2' })
    public rating: number;

    @Column({ type: 'text' })
    public text: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

    @OneToOne(() => ImagesEntity)
    @JoinColumn({ name: 'photo_uuid' })
    readonly photo: ImagesEntity | null;

}
