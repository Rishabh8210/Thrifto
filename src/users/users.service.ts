import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { BcryptService } from 'src/common/utils/bcrypt.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(

        private readonly bcryptService: BcryptService,

        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}

    async create(userDetails: CreateUserDto): Promise<Users> {
        try {
            const user = this.userRepository.create(userDetails);

            // Haashed password before creating new user
            user.password = await this.bcryptService.hashPassword(user.password);

            return await this.userRepository.save(user);
        } catch (error) {
            console.log("Error(User Repository): Failed to create User -> ", error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async get(filter: FindUserDto){
        try {
            const user = await this.userRepository.findOne({
                where: filter
            });

            if(!user){
                throw new NotFoundException('No user found');
            }

            return user;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get user with filter')
        }
    }

    async getAll(filter: FindUserDto){
        try {
            const users = await this.userRepository.find({
                where: filter
            })
    
            if(!users){
                throw new NotFoundException('No users found');
            }

            return users;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get all users with filter')
        }
    }

    async update(update: UpdateUserDto, userId: number){
        try {
            
            // get user if it was present in the db
            const user = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            })

            if(!user){
                throw new NotFoundException('No user found');
            }
            
            user.name = user.name ?? update.name;
            user.totalAmount = user.totalAmount ?? update.totalAmount;

            if(update.password){
                user.password = user.password ?? await this.bcryptService.hashPassword(update.password);
            }

            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user details');
        }
    }

    async delete(userId: number){
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            })

            if(!user){
                throw new NotFoundException('No user found');
            }

            await this.userRepository.delete({id: user.id});
            return {
                message: 'User deleted successfully',
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete user data');
        }
    }
}
