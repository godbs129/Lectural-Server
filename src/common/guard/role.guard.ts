import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/api/auth/auth.service';
import { TokenService } from 'src/api/token/token.service';
import { User } from 'src/domain/entity/user.entity';
import { IToken } from '../interfaces/IToken';
import matchRoles from '../lib/matchRoles';
import validateData from '../lib/validateData';
import AuthRequest from '../types/auth.request';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();

    const roles: number[] = this.reflector.get<number[]>(
      'roles',
      context.getHandler(),
    );

    if (roles === undefined) {
      return true;
    }

    const token: string = request.headers['authorization'];

    if (!validateData(token)) {
      throw new BadRequestException('토큰이 존재하지 않습니다');
    }

    const payload: IToken = this.tokenService.verifyToken(token);
    const user: User = await this.authService.getUserById(payload.uniqueId);

    request.user = user;
    return matchRoles(roles, user.accessLevel);
  }
}
