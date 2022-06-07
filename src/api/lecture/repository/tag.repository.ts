import { Tags } from 'src/domain/entity/tags.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Tags)
export class TagsRepository extends Repository<Tags> {}
