import { Injectable } from '@nestjs/common';
import { Notice } from 'src/domain/entity/notice.entity';
import { NoticeRepository } from './repository/notice.repository';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  findByDate(): Promise<Notice[]> {
    return this.noticeRepository.findByDate(new Date());
  }

  createNotice(
    title: string,
    reason: string,
    author: string,
    expireDate: Date,
  ): void {
    this.noticeRepository.save({
      title: title,
      reason: reason,
      author: author,
      expireDate: expireDate,
    });
  }
}
