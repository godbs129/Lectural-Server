import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import LectureRepository from './repository/lecture.repository';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LectureRepository]),
    AuthModule,
    TokenModule,
    PlaceModule,
  ],
  providers: [LectureService],
  controllers: [LectureController],
})
export class LectureModule {}
