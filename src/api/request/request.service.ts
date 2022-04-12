import { Injectable } from '@nestjs/common';
import { RequestRepository } from './repository/request.repository';

@Injectable()
export class RequestService {
  constructor(private readonly requestRepository: RequestRepository) {}
}
