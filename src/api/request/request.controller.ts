import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import ResponseData from 'src/common/response/DataResponse';
import { Response } from 'src/common/response/Response';
import { RequestDto } from 'src/domain/dto/request/request.dto';
import { Request } from 'src/domain/entity/request.entity';
import { User } from 'src/domain/entity/user.entity';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('/')
  async getRequestsByRandom(): Promise<ResponseData<Request[]>> {
    const requests: Request[] = await this.requestService.getRequestsByRandom();

    return ResponseData.dataOk('request 조회 성공', requests);
  }

  @Post('/')
  @Roles(1)
  async requestLecture(
    @Body() dto: RequestDto,
    @Token() user: User,
  ): Promise<Response> {
    await this.requestService.requestLecture(dto, user);

    return Response.ok('특강 요청 성공');
  }
}
