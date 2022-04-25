import { Injectable } from '@nestjs/common';
import { Notice } from 'src/domain/entity/notice.entity';
import { NoticeRepository } from './repository/notice.repository';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  findByDate(): Promise<Notice[]> {
    return this.noticeRepository.findByDate(new Date());
  }
}
