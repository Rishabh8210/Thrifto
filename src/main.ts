import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
