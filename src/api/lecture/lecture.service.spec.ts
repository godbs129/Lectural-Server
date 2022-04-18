import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { Repository } from 'typeorm';
import { ApplicationModule } from '../application/application.module';
import { ApplicationService } from '../application/application.service';
import { ApplicationRepository } from '../application/repository/application.repository';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/repository/user.repository';
import { PlaceModule } from '../place/place.module';
import { PlaceService } from '../place/place.service';
import { PlaceRepository } from '../place/repository/place.repository';
import { TokenModule } from '../token/token.module';
import { LectureService } from './lecture.service';
import LectureRepository from './repository/lecture.repository';

const mockLectureRepository = () => ({
  find: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('LectureService', () => {
  let lectureService: LectureService;
  let lectureRepository: MockRepository<Lecture>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TokenModule,
        PlaceRepository,
        UserRepository,
        ApplicationRepository,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        LectureService,
        LectureRepository,
        PlaceService,
        PlaceRepository,
        ApplicationService,
        ApplicationRepository,
        {
          provide: getRepositoryToken(Lecture),
          useValue: mockLectureRepository(),
        },
      ],
    }).compile();

    lectureService = module.get<LectureService>(LectureService);
    lectureRepository = module.get<MockRepository<Lecture>>(
      getRepositoryToken(Lecture),
    );
  });

  describe('getLecture', () => {
    it('특강 전체 조회', async () => {
      lectureRepository.find.mockResolvedValue([]);

      const result: Lecture[] = await lectureService.getLectures();

      expect(result).toEqual([]);
    });
  });
});
