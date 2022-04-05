import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import ResponseData from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { LectureDto } from 'src/domain/dto/lecture/lecture.dto';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { User } from 'src/domain/entity/user.entity';
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
  @Roles(1, 3)
  async getLecture(@Param('idx') idx: number): Promise<ResponseData<Lecture>> {
    const lecture: Lecture = await this.lectureService.getLecture(idx);

    return ResponseData.dataOk('강의 상세 조회 성공', lecture);
  }

  @Post('/')
  @Roles(1, 3)
  @HttpCode(200)
  async addLecture(
    @Body() dto: LectureDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.lectureService.addLecture(dto, user);

    return Response.ok('특강 등록 성공');
  }

  @Delete('/:idx')
  @Roles(3)
  async deleteLecture(@Param('idx') idx: number): Promise<Response> {
    await this.lectureService.deleteLecture(idx);

    return Response.ok('부적절한 특강 삭제');
  }
}
