import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import AuthRequest from '../types/auth.request';

export class AuthGuard implements CanActivate {
  constructor() {
    // Token Service & User Service
  }

  public canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: AuthRequest = ctx.getRequest();

    const token: string = request.headers['authorization'];

    if (token === undefined) {
      throw new BadRequestException('토큰이 존재하지 않습니다');
    }

    // Todo: 토큰 verify & 유저 정보 가져오는 로직
    request.user = 'asdf';
    return true;
  }
}
