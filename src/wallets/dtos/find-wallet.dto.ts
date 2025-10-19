import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class FindWalletDto {
    @IsNumber()
    @IsOptional()
    id: number

    @IsString()
    @IsOptional()
    name: string
}