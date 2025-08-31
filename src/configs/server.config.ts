import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('server', () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    saltRound: parseInt(process.env.SALT_ROUND || '10', 10),
}))