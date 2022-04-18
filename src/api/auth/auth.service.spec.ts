import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/domain/entity/user.entity';
import { getConnection, Repository } from 'typeorm';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';
import { TokenModule } from '../token/token.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AuthService', () => {
  let authService: AuthService;
  // let userRepository: UserRepository;
  let userRepository: MockRepository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TokenModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockPostRepository(),
        },
        UserRepository,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  describe('getUserById', () => {
    it('userId로 유저 조회', async () => {
      // const user: User = await authService.getUserById('test');
      // console.log(user);
      const mockedUser = {
        uniqueId: 'woaihgoweih',
        name: '전해윤',
        accessLevel: 1,
        profileImage: '1284u12',
      };

      userRepository.findOne.mockResolvedValue(mockedUser);

      const result = await authService.getUserById('woaihgoweih');
      console.log(result);
    });
  });
});
