import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ){}

    async create(userDetails: CreateUserDto): Promise<Users> {
        try {
            const user =  this.userRepository.create(userDetails);
            return await this.userRepository.save(user);
        } catch (error) {
            console.log("Error(User Repository): Failed to create User -> ", error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }
}
