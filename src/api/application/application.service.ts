import { Injectable } from '@nestjs/common';
import { Application } from 'src/domain/entity/application.entity';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { User } from 'src/domain/entity/user.entity';
import { ApplicationRepository } from './repository/application.repository';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async createApplication(lecture: Lecture, user: User): Promise<void> {
    const application: Application = this.applicationRepository.create({
      lecture: lecture,
      user: user,
    });

    await this.applicationRepository.save(application);
  }
}
