import { IsNumber, IsString } from "class-validator";

export class UpdateWalletDto {
    @IsString()
    name: string

    @IsNumber()
    amount: number
}