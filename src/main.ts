import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { PORT } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use('/public', express.static(join(__dirname, '../public')));
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
