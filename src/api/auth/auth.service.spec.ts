import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { getConnection, Repository } from 'typeorm';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';
import { TokenModule } from '../token/token.module';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TokenModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [AuthService, UserRepository],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  // afterAll(async () => {
  //   await getConnection().close();
  // });

  describe('getUserById', () => {
    it('userId로 유저 조회', async () => {
      const user: User = await authService.getUserById('test');
      console.log(user);
    });
  });
});
