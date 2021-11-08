import { IsNotEmpty, IsString } from 'class-validator';

export class InstagramUserDto {

    @IsString()
    @IsNotEmpty()
    public name: string;

}
