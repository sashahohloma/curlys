import { IsNotEmpty, IsUUID } from 'class-validator';

export class ImagesGetDto {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

}
