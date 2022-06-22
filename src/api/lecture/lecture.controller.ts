import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import ResponseData from 'src/common/response/DataResponse';
import { Response } from 'src/common/response/Response';
import { CreateLectureDto } from 'src/domain/dto/lecture/create-lecture.dto';
import { DeleteInapposite } from 'src/domain/dto/lecture/delete-inapposite.dto';
import { ModifyLectureDto } from 'src/domain/dto/lecture/modify-lecture.dto';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { User } from 'src/domain/entity/user.entity';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get('/today')
  async getTodayLecture(): Promise<ResponseData<Lecture[]>> {
    return ResponseData.dataOk(
      '오늘의 특강 조회 성공',
      await this.lectureService.getTodayLecture(),
    );
  }

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
    @Body() dto: CreateLectureDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.lectureService.addLecture(dto, user);

    return Response.ok('특강 등록 성공');
  }

  @Put('/:lectureIdx')
  @Roles(1)
  async modifyLecture(
    @Param('lectureIdx') lectureIdx: number,
    @Body() dto: ModifyLectureDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.lectureService.modifyLecture(lectureIdx, user, dto);

    return Response.ok('특강 수정 성공');
  }

  @Delete('/:lectureIdx')
  @Roles(1)
  async deleteLecture(
    @Param('lectureIdx') lectureIdx: number,
    @Token() user: User,
  ): Promise<Response> {
    await this.lectureService.deleteLecture(lectureIdx, user);

    return Response.ok('특강 삭제 성공');
  }

  @Post('/inapposite/:idx')
  @Roles(3)
  async deleteInappositeLecture(
    @Param('idx') idx: number,
    @Body() data: DeleteInapposite,
  ): Promise<Response> {
    await this.lectureService.deleteInappositeLecture(idx, data);

    return Response.ok('부적절한 특강 삭제 성공');
  }

  @Put('/:lectureIdx/:placeIdx')
  @Roles(3)
  async reassignment(
    @Param('lectureIdx') lectureIdx: number,
    @Param('placeIdx') placeIdx: number,
  ): Promise<Response> {
    await this.lectureService.reassignment(lectureIdx, placeIdx);

    return Response.ok('장소 재배정 성공');
  }

  @Post('/audit/:idx')
  @Roles(1)
  async auditApplication(
    @Param('idx') idx: number,
    @Token() user: User,
  ): Promise<Response> {
    await this.lectureService.auditApplication(idx, user);

    return Response.ok('청강 신청 완료');
  }
}
