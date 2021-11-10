import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'curlys', name: 'images' })
export class ImagesEntity {

    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: string;

}
