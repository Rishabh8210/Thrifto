import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallets } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { Users } from 'src/users/entities/user.entity';
import { FindWalletDto } from './dtos/find-wallet.dto';
import { UpdateWalletDto } from './dtos/update-wallet.dto';

@Injectable()
export class WalletsService {
    constructor(

        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        @InjectRepository(Wallets)
        private readonly walletRepositroy: Repository<Wallets>
    ) {}

    async create (walletDetails: CreateWalletDto): Promise<Wallets> {
        try {

            const user = await this.userRepository.findOne({
                where: {
                    id: walletDetails.userId
                }
            })

            if(!user){
                throw new NotFoundException('User not found');
            }

            const isWallet = await this.walletRepositroy.find({
                where: {
                    name: walletDetails.name
                }
            })

            if(isWallet){
                throw new ConflictException('Wallet with this name is already present')
            }

            const wallet = this.walletRepositroy.create(walletDetails);

            wallet.user = user

            return await this.walletRepositroy.save(wallet);
        } catch (error) {
            console.log("Error: Failed to create wallet");
            throw new InternalServerErrorException('Failed to create wallet');
        }
    }

    async getWalletDetails(walletDetails: FindWalletDto) {
        try {
            const wallet = await this.walletRepositroy.findOne({
                where: {
                    id: walletDetails.id
                }
            })

            if(!wallet){
                throw new NotFoundException('No wallet found');
            }

            return wallet;
        } catch (error) {
            console.log("Error: Failed to get wallet details");
            throw new InternalServerErrorException('Failed to get wallet details');
        }
    }

    async getAllWalletDetails(walletDetails: FindWalletDto) {
        try {
            const wallets = await this.walletRepositroy.find({});

            if(!wallets){
                throw new NotFoundException('No wallets found');
            }

            return wallets;
        } catch (error) {
            console.log("Error: Failed to get wallets details");
            throw new InternalServerErrorException('Failed to get all wallets details');
        }
    }

    async updateWalletDetails(walletId: number, walletDetails: UpdateWalletDto): Promise<Wallets> {
        try {
            const wallet = await this.walletRepositroy.findOne({
                where: {
                    id: walletId
                }
            })

            if(!wallet){
                throw new NotFoundException('No wallet found');
            }

            wallet.name = walletDetails.name;
            wallet.amount = walletDetails.amount;

            return await this.walletRepositroy.save(wallet);
        } catch (error) {
            console.log("Error: Failed to update wallet details");
            throw new InternalServerErrorException('Failed to update wallet details');
        }
    }
}
