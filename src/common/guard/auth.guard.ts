import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { TokenService } from 'src/api/token/token.service';
import AuthRequest from '../types/auth.request';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: AuthRequest = ctx.getRequest();

    const token: string = request.headers['authorization'];

    if (token === undefined) {
      throw new BadRequestException('토큰이 존재하지 않습니다');
    }

    const payload = this.tokenService.verifyToken(token);
    const user = this.authService.getUserById(payload.uniqueId);

    request.user = user;
    return true;
  }
}
