import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import bcrypt from 'bcrypt'


@Injectable()
export class BcryptService {
    private readonly saltRound: number

    constructor(private readonly configService: ConfigService){
        try {
            this.saltRound = this.configService.get<number>('server.saltRound', 10);
        } catch( error ){
            this.saltRound = 10;
        }
    }

    /**
     * Hashes a password using bcrypt
     * @param password - The plain text password to hash
     * @returns Promise<string> - The hashed password
     */
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRound);
        return bcrypt.hash(password, salt)
    }

    /**
     * Compares a plain text password with a hashed password
     * @param password - The plain text password to check
     * @param hashedPassword - The hashed password to compare against
     * @returns Promise<boolean> - True if passwords match, false otherwise
     */
    async comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }
}