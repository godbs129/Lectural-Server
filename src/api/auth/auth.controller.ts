import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { User } from 'src/domain/entity/user.entity';
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
  dodamLoginUrl(): ResponseData<string> {
    const clientId: string = this.configService.get<string>('client_id');

    return ResponseData.dataOk(
      '로그인 url 조회 성공',
      `http://dauth.b1nd.com/login?response_type=code&client_id=${clientId}&state=null&redirect_uri=http://lectural.kro.kr`,
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

  @Get('/user')
  @Roles(1, 3)
  async getUser(@Token() user: User) {
    return user;
  }
}
