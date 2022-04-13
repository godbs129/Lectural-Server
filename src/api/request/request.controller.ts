import { Controller, Get } from '@nestjs/common';
import ResponseData from 'src/common/response/DataResponse';
import { Request } from 'src/domain/entity/request.entity';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('/')
  async getRequestsByRandom(): Promise<ResponseData<Request[]>> {
    const requests: Request[] = await this.requestService.getRequestsByRandom();

    return ResponseData.dataOk('request 조회 성공', requests);
  }
}
