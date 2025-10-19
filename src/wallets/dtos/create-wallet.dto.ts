import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateWalletDto {
    @IsString()
    name: string

    @IsNumber()
    amount: number

    @IsNumber()
    userId: number

    @IsString()
    @IsOptional()
    description: string
}