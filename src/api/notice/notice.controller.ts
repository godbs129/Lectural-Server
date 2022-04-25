import { Controller, Get } from '@nestjs/common';
import ResponseData from 'src/common/response/DataResponse';
import { Notice } from 'src/domain/entity/notice.entity';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('/')
  async findByDate(): Promise<ResponseData<Notice[]>> {
    const notices: Notice[] = await this.noticeService.findByDate();

    return ResponseData.dataOk('삭제 공지 조회', notices);
  }
}
