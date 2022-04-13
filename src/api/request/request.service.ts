import { Injectable } from '@nestjs/common';
import { Request } from 'src/domain/entity/request.entity';
import { RequestRepository } from './repository/request.repository';

@Injectable()
export class RequestService {
  constructor(private readonly requestRepository: RequestRepository) {}

  getRequestsByRandom(): Promise<Request[]> {
    return this.requestRepository.getRequestsByRandom();
  }
}
