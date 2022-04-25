import { Injectable } from '@nestjs/common';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { Notice } from 'src/domain/entity/notice.entity';
import { NoticeRepository } from './repository/notice.repository';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  findByDate(): Promise<Notice[]> {
    return this.noticeRepository.findByDate(new Date());
  }

  createNotice(lecture: Lecture, expireDate: Date): void {
    this.noticeRepository.save({
      lecture: lecture,
      expireDate: expireDate,
    });
  }
}
