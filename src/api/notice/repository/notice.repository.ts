import { Notice } from 'src/domain/entity/notice.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  findByDate(date: Date): Promise<Notice[]> {
    return this.createQueryBuilder('notice')
      .leftJoinAndSelect('notice.lecture', 'lecture')
      .where('notice.expire_date > :date', { date })
      .getMany();
  }
}
