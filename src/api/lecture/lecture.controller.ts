import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guard/auth.guard';
import ResponseData from 'src/common/response/DataResponse';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get('/')
  async getLectures(): Promise<ResponseData<Lecture[]>> {
    const lectures: Lecture[] = await this.lectureService.getLectures();

    return ResponseData.dataOk('강의 조회 성공', lectures);
  }

  @Get('/:idx')
  async getLecture(@Param('idx') idx: number): Promise<ResponseData<Lecture>> {
    const lecture: Lecture = await this.lectureService.getLecture(idx);

    return ResponseData.dataOk('강의 조회 성공', lecture);
  }
}