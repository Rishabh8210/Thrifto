import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BcryptService } from 'src/common/utils/bcrypt.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UsersService,
        private readonly bcryptService: BcryptService
    ) {}


    async registerUser(userDetails: CreateUserDto) {
        try {
            // Check user already have already registerd
            const filterUser = {
                email: userDetails.email,
                phone: userDetails.phone,
            }
            const isUserRegistered = await this.userService.get(filterUser);
            
            if(isUserRegistered){
                throw new NotFoundException('User already registered with this email')
            }

            const registerUser = await this.userService.create(userDetails);
            return registerUser;
        } catch (error) {
            throw new InternalServerErrorException('Failed to register user')   
        }
    }

    async loginUser(userDetails: Partial<CreateUserDto>) {
        try {
            const filterUser = {
                email: userDetails.email,
            }

            const user = await this.userService.get(filterUser);
            
            if(!user) {
                throw new NotFoundException('No user found');
            }

            if(!userDetails.password){
                throw new NotFoundException('No user found');
            }

            const isPasswordCorrect = await this.bcryptService.comparePassword(userDetails.password, user.password);
            
            if(!isPasswordCorrect){
                throw new BadRequestException('Invalid password');
            }

            // login generate token and return to the user
        } catch (error) {
            throw new InternalServerErrorException('Failed to signin');
        }
    }
}
