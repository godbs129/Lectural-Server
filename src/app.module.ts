import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CatchException from './common/filter/ExceptionFilter';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './api/auth/auth.module';
import { TokenModule } from './api/token/token.module';
import { LectureModule } from './api/lecture/lecture.module';
import { PlaceModule } from './api/place/place.module';
import { RoleGuard } from './common/guard/role.guard';
import { ApplicationModule } from './api/application/application.module';
import { RequestModule } from './api/request/request.module';
import { NoticeModule } from './api/notice/notice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    TokenModule,
    LectureModule,
    PlaceModule,
    ApplicationModule,
    RequestModule,
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('/');
  }
}
