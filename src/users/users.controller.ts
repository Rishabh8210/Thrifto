import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    
    constructor(
        private readonly userService: UsersService
    ){}

    /**
     * Retrieves a specific user by ID
     * @param id - user ID
     * @returns The requested user
     * @throws NotFoundException if user is not found
     */
    @Get()
    async getDetails(){
        try {
            return 'User details'
        } catch (error) {
            return 'failed to get user details'
        }
    }


    @Post()
    async createUser(@Body() body: CreateUserDto) {
        try {
            const user = await this.userService.create(body);
            return user;
        } catch (error) {
            throw error
        }
    }
}
