import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { ImagesEntity } from './images.entity';

@Entity({ schema: 'curlys', name: 'instagram' })
export class InstagramEntity {

    @PrimaryColumn({ type: 'varchar', length: 100 })
    public shortcode: string;

    @Column({ type: 'uuid', name: 'photo_uuid', nullable: true })
    public photoUUID: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    public createdAt: string;

    @OneToOne(() => ImagesEntity)
    @JoinColumn({ name: 'photo_uuid' })
    readonly photo: ImagesEntity;

}
