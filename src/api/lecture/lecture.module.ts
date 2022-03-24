import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import LectureRepository from './repository/lecture.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LectureRepository])],
  providers: [LectureService],
  controllers: [LectureController],
})
export class LectureModule {}
