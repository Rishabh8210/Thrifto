import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UsersService
    ) {}


    async registerUser(userDetails: CreateUserDto) {
        try {
            // Check user already have already registerd
            const filterUser = {
                email: userDetails.email,
                phone: userDetails.phone,
            }
            const isUserRegistered = await this.userService.get(filterUser);
            
            if(!isUserRegistered){
                throw new NotFoundException('User not found with these filters')
            }

            const registerUser = await this.userService.create(userDetails);
            return registerUser;
        } catch (error) {
            throw new InternalServerErrorException('Failed to register user')   
        }
    }
}
