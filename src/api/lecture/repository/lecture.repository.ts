import { Lecture } from 'src/domain/entity/lecture.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Lecture)
export default class LectureRepository extends Repository<Lecture> {
  findByIdx(idx: number): Promise<Lecture | undefined> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }
}
