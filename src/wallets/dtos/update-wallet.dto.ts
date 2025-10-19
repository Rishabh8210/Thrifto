import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateWalletDto {
    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    amount: number

    @IsString()
    @IsOptional()
    description: string
}