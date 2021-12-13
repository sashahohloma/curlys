import { integerParse } from '@sashahohloma/utilities';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Min, Max, IsNumber, MinLength } from 'class-validator';
import { Limits } from '../../../constants/limits.constants';
import { ReviewsEntity } from '../../../database/entities/reviews.entity';

export class ReviewsCreateDto implements Pick<ReviewsEntity, 'name' | 'rating' | 'text'> {

    @IsString()
    @IsNotEmpty()
    @MinLength(Limits.four)
    public name: string;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @Min(1)
    @Max(Limits.five)
    public rating: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(Limits.ten)
    public text: string;

    @IsString()
    @IsNotEmpty()
    public slug: string;

}
