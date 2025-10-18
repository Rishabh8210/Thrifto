import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallets } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dtos/create-wallet.dto';
import { Users } from 'src/users/entities/user.entity';

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
}
