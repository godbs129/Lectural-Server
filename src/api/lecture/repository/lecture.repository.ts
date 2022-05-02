import { Lecture } from 'src/domain/entity/lecture.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Lecture)
export default class LectureRepository extends Repository<Lecture> {
  findByIdx(idx: number): Promise<Lecture | undefined> {
    return this.createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.user', 'user')
      .where('idx = :idx', { idx })
      .getOne();
  }

  findByDate(): Promise<Lecture[]> {
    return this.createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.user', 'user')
      .where('DATE_FORMAT(start_date, "%Y-%m-%d") = CURDATE()')
      .getMany();
  }
}
