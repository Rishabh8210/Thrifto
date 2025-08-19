import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import serverConfig from './configs/server.config';

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
  const appConfig = app.get(serverConfig);
  const port = appConfig.get('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
