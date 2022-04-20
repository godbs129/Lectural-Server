import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponse } from 'axios';
import { ILoginRes, IRequestData } from 'src/common/interfaces/IAuth';
import validateData from 'src/common/lib/validateData';
import DodamLoginDto from 'src/domain/dto/auth/dodamLogin.dto';
import { User } from 'src/domain/entity/user.entity';
import { TokenService } from '../token/token.service';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async dodamLogin(data: DodamLoginDto): Promise<ILoginRes> {
    const requestData: IRequestData = {
      code: data.code,
      client_id: this.configService.get<string>('client_id'),
      client_secret: this.configService.get<string>('client_secret'),
    };

    const getToken: AxiosResponse = await axios.post(
      'http://dauth.b1nd.com/api/token',
      requestData,
    );

    const getUser: AxiosResponse = await axios.get(
      'http://open.dodam.b1nd.com/api/user',
      {
        headers: {
          Authorization: 'Bearer ' + getToken.data.access_token,
        },
      },
    );

    let user: User | undefined = await this.userRepository.findById(
      getUser.data.data.uniqueId,
    );

    if (!validateData(user)) {
      user = this.userRepository.create({
        uniqueId: getUser.data.data.uniqueId,
        name: getUser.data.data.name,
        accessLevel: getUser.data.data.accessLevel,
        profileImage: getUser.data.data.profileImage,
      });
      await this.userRepository.save(user);
    }

    const accessToken: string = this.tokenService.generateAccessToken(
      user.uniqueId,
    );
    const refreshToken: string = this.tokenService.generateRefreshToken(
      user.uniqueId,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public async getUserById(id: string): Promise<User> {
    const user: User = await this.userRepository.findById(id);

    if (!validateData(user)) {
      throw new NotFoundException('존재하지 않는 유저');
    }

    return user;
  }
}
