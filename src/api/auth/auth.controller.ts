import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ILoginRes } from '../../common/interfaces/IAuth';
import ResponseData from '../../common/response/DataResponse';
import DodamLoginDto from '../../domain/dto/auth/dodamLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/')
  dodamLoginUrl() {
    const clientId: string = this.configService.get<string>('client_id');

    return ResponseData.dataOk(
      '로그인 url 조회 성공',
      `http://dauth.b1nd.com/login?response_type=code&client_id=${clientId}&state=null&redirect_uri=http://localhost:3000`,
    );
  }

  @HttpCode(200)
  @Post('/')
  async dodamLogin(
    @Body() data: DodamLoginDto,
  ): Promise<ResponseData<ILoginRes>> {
    const tokens: ILoginRes = await this.authService.dodamLogin(data);

    return ResponseData.dataOk('로그인 성공', tokens);
  }
}
