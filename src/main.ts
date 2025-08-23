import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with wildcard origin (consider restricting this in production)
  app.enableCors({
    origin: true
  })

  // Adding validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  // Adding prefix 'api' urls
  app.setGlobalPrefix('api')

  // Get port from environment variables or use default
  const appConfig = app.get(ConfigService);
  const port = appConfig.get('PORT') || 3000;

  await app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
  });
}
bootstrap();
