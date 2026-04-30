import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {
    @Field()
    @IsString()
    name: string;

    @Field(() => Float)
    @Type(() => Number)
    @IsNumber()
    price: number;

    @Field(() => ID)
    @Type(() => Number)
    @IsNumber()
    categoryId: number;
}