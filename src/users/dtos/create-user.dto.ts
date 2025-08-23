import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    @IsOptional()
    isVerified?: boolean;

    @IsNumber()
    @IsOptional()
    totalAmount: number;
}