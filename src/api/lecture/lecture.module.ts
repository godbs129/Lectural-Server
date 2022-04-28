import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import LectureRepository from './repository/lecture.repository';
import { PlaceModule } from '../place/place.module';
import { ApplicationModule } from '../application/application.module';
import { NoticeModule } from '../notice/notice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LectureRepository]),
    PlaceModule,
    ApplicationModule,
    NoticeModule,
  ],
  providers: [LectureService],
  controllers: [LectureController],
  exports: [LectureService],
})
export class LectureModule {}
