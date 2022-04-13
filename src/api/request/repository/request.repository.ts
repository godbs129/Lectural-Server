import { Request } from 'src/domain/entity/request.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {
  getRequestsByRandom(): Promise<Request[]> {
    return this.createQueryBuilder().orderBy('RAND()').limit(3).getMany();
  }
}
