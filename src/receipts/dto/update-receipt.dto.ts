import { IsDateString, IsNumber, isNumber, IsOptional, IsString, IsStrongPassword, Min } from "class-validator";

export class UpdateReceiptDto {
    @IsOptional()
    @IsDateString()
    issuedAt?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}