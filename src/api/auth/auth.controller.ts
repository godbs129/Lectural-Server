import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoginRes } from 'src/common/interfaces/IAuth';
import ResponseData from 'src/common/response/DataResponse';
import DodamLoginDto from 'src/domain/dto/auth/dodamLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/url')
  dodamLoginUrl() {
    const clientId: string = this.configService.get<string>('client_id');

    return ResponseData.dataOk(
      '로그인 url 조회 성공',
      `http://dauth.b1nd.com/login?response_type=code&client_id=${clientId}&state=null&redirect_uri=http://localhost:3000`,
    );
  }

  @Post('/')
  async dodamLogin(
    @Body() data: DodamLoginDto,
  ): Promise<ResponseData<ILoginRes>> {
    const tokens: ILoginRes = await this.authService.dodamLogin(data);

    return ResponseData.dataOk('로그인 성공', tokens);
  }
}
