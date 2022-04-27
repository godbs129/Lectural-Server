import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/domain/entity/user.entity';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';
import { TokenModule } from '../token/token.module';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  findById: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: MockRepository<UserRepository>;

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
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<MockRepository<UserRepository>>(
      getRepositoryToken(UserRepository),
    );
  });

  describe('getUserById', () => {
    it('userId로 유저 조회 성공', async () => {
      const mockedUser = {
        uniqueId: 'woaihgoweih',
        name: 'Lectural',
        accessLevel: 1,
        profileImage: 'https://naver.com',
      };

      userRepository.findById.mockResolvedValue(mockedUser);

      const result = await authService.getUserById('woaihgoweih');

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith('woaihgoweih');
      expect(result).toEqual(mockedUser);
    });

    it('userId로 유저 조회 실패', async () => {
      userRepository.findById.mockResolvedValue(undefined);

      try {
        await authService.getUserById('woaihgoweih');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
