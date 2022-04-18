import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { ApplicationService } from '../application/application.service';
import { ApplicationRepository } from '../application/repository/application.repository';
import { UserRepository } from '../auth/repository/user.repository';
import { PlaceService } from '../place/place.service';
import { PlaceRepository } from '../place/repository/place.repository';
import { TokenModule } from '../token/token.module';
import { LectureService } from './lecture.service';
import LectureRepository from './repository/lecture.repository';

const mockLectureRepository = () => ({
  find: jest.fn(),
  findByIdx: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('LectureService', () => {
  let lectureService: LectureService;
  let lectureRepository: MockRepository<LectureRepository>;

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
    lectureRepository = module.get<MockRepository<LectureRepository>>(
      getRepositoryToken(Lecture),
    );
  });

  describe('getLectures', () => {
    it('특강 전체 조회 성공', async () => {
      lectureRepository.find.mockResolvedValue([]);

      const result: Lecture[] = await lectureService.getLectures();

      expect(result).toEqual([]);
    });
  });

  describe('getLecture', () => {
    it('특정 특강 조회 성공', async () => {
      const mockLecture = {
        idx: 1,
        title: 'asdlkfnwelk',
        content: 'asdf',
        user: {
          uniqueId: 'woaihgoweih',
          name: 'Lectural',
          accessLevel: 1,
          profileImage: 'https://naver.com',
        },
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
      };

      lectureRepository.findByIdx.mockResolvedValue(mockLecture);

      const result = await lectureService.getLecture(1);

      expect(lectureRepository.findByIdx).toHaveBeenCalledTimes(1);
      expect(lectureRepository.findByIdx).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockLecture);
    });

    it('특정 특강 조회 실패', async () => {
      lectureRepository.findByIdx.mockResolvedValue(undefined);

      try {
        await lectureService.getLecture(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // describe('addLecture', () => {
  //   it('특강 생성 성공', async () => {});
  // });
});
