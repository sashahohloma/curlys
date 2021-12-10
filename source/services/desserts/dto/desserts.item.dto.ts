import { IsNotEmpty, IsUUID } from 'class-validator';

export class DessertsItemDto {

    @IsNotEmpty()
    @IsUUID('4')
    public uuid: string;

}
