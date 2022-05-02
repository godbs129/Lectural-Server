import { Injectable } from '@nestjs/common';
import { RequestDto } from 'src/domain/dto/request/request.dto';
import { Request } from 'src/domain/entity/request.entity';
import { User } from 'src/domain/entity/user.entity';
import { RequestRepository } from './repository/request.repository';

@Injectable()
export class RequestService {
  constructor(private readonly requestRepository: RequestRepository) {}

  getRequestsByRandom(): Promise<Request[]> {
    return this.requestRepository.getRequestsByRandom();
  }

  async requestLecture(dto: RequestDto, user: User): Promise<void> {
    await this.requestRepository.save({
      content: dto.content,
      user: user,
    });
  }
}
