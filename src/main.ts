import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:4000',
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
