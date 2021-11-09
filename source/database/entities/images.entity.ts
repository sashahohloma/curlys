import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'curlys', name: 'images' })
export class ImagesEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ type: 'text', comment: 'image/webp' })
    public content: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

}
