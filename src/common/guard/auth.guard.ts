import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { TokenService } from 'src/api/token/token.service';
import { User } from 'src/domain/entity/user.entity';
import { IToken } from '../interfaces/IToken';
import validateData from '../lib/validateData';
import AuthRequest from '../types/auth.request';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request: AuthRequest = ctx.getRequest();

    const token: string = request.headers['authorization'];

    if (!validateData(token)) {
      throw new BadRequestException('토큰이 존재하지 않습니다');
    }

    const payload: IToken = this.tokenService.verifyToken(token);
    const user: User = await this.authService.getUserById(payload.uniqueId);

    request.user = user;
    return true;
  }
}
