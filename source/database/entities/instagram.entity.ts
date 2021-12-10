import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { ImagesEntity } from './images.entity';

@Entity({ schema: 'curlys', name: 'instagram' })
export class InstagramEntity {

    @PrimaryColumn({ type: 'varchar', length: 100 })
    public shortcode: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    public createdAt: string;

    @OneToOne(() => ImagesEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'photo_uuid', referencedColumnName: 'uuid' })
    public photo: ImagesEntity;

}
