import { Body, Controller, Get } from '@nestjs/common';
import ResponseData from 'src/common/response/DataResponse';
import { RefreshTokenDto } from 'src/domain/dto/token/refreshToken.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/refresh')
  async refreshToken(
    @Body() data: RefreshTokenDto,
  ): Promise<ResponseData<string>> {
    const accessToken: string = await this.tokenService.refreshToken(
      data.refreshToken,
    );

    return ResponseData.dataOk('토큰 재발급 성공', accessToken);
  }
}
