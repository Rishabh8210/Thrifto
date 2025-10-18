import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

export class JWTService {
    private readonly secretKey: string

    constructor( private readonly configService: ConfigService ){    
        this.secretKey = this.configService.get<string>('server.secretKey', 'super-secret-key')
    }

    /**
     * 
     */
    async generateJWTToken(payload: any){
        try {
            
        } catch (error) {
            
        }
    }
}