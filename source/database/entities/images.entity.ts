import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'curlys', name: 'images' })
export class ImagesEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ type: 'text' })
    public original: string;

    @Column({ type: 'text' })
    public thumbnail: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

}
