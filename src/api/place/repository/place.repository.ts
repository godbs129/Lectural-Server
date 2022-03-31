import { Place } from 'src/domain/entity/place.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  getPlace(idx: number): Promise<Place | undefined> {
    return this.createQueryBuilder().where('idx = :idx', { idx }).getOne();
  }
}
