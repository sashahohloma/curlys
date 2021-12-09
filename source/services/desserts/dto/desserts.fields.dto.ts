import { booleanOr, integerParse } from '@sashahohloma/utilities';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Max } from 'class-validator';
import { Limits } from '../../../constants/limits.constants';
import { DessertsFields, DessertsQuantity } from '../desserts.models';

export class DessertsFieldsDto implements DessertsFields {

    @IsString()
    @IsNotEmpty()
    public slug: string;

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public short_description: string;

    @IsString()
    @IsNotEmpty()
    public full_description: string;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    public protein: number;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    public fats: number;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    public carbohydrates: number;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    public calories: number;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    @Max(Limits.oneHundred)
    public daily: number;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    public weight: number;

    @IsString()
    @IsNotEmpty()
    public storing: string;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    @IsEnum(DessertsQuantity)
    public quantity: DessertsQuantity;

    @Transform((p) => integerParse(p.value))
    @IsNumber()
    @IsPositive()
    public price: number;

    @Transform((p) => booleanOr(p.value, true))
    @IsBoolean()
    public isPublic: boolean;
}
