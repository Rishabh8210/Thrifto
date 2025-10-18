import { IsNumber, IsString } from "class-validator";

export class CreateWalletDto {
    @IsString()
    name: string

    @IsNumber()
    amount: number

    @IsNumber()
    userId: number
}