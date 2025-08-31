import { IsNumber, isNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsNumber()
    @IsOptional()
    totalAmount: number;
}