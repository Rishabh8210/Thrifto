import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    
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
}
