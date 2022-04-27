import { User } from '../../../domain/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findById(id: string): Promise<User | undefined> {
    return this.createQueryBuilder().where('unique_id = :id', { id }).getOne();
  }
}
