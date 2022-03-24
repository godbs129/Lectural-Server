import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CatchException from './common/filter/ExceptionFilter';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './api/auth/auth.module';
import { TokenModule } from './api/token/token.module';
import { LectureModule } from './api/lecture/lecture.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    TokenModule,
    LectureModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('/');
  }
}
