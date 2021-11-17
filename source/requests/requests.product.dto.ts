import { IsNotEmpty, IsString } from 'class-validator';

export class RequestsProductDto {

    @IsString()
    @IsNotEmpty()
    public slug: string;

}
