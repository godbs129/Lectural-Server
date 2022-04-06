import { Application } from 'src/domain/entity/application.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {}
