import { Lecture } from 'src/domain/entity/lecture.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Lecture)
export default class LectureRepository extends Repository<Lecture> {
  findAll(): Promise<Lecture[]> {
    return this.createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.tags', 'tags')
      .leftJoinAndSelect('lecture.place', 'place')
      .leftJoinAndSelect('lecture.user', 'user')
      .orderBy('lecture.createdAt', 'DESC')
      .getMany();
  }

  findByIdx(idx: number): Promise<Lecture | undefined> {
    return this.createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.user', 'user')
      .leftJoinAndSelect('lecture.tags', 'tags')
      .where('lecture.idx = :idx', { idx })
      .getOne();
  }

  findByDate(): Promise<Lecture[]> {
    return this.createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.user', 'user')
      .leftJoinAndSelect('lecture.tags', 'tags')
      .where('DATE_FORMAT(start_date, "%Y-%m-%d") = CURDATE()')
      .getMany();
  }
}
