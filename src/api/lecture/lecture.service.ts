import { Injectable, NotFoundException } from '@nestjs/common';
import { Lecture } from 'src/domain/entity/lecture.entity';
import LectureRepository from './repository/lecture.repository';

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) {}

  getLectures(): Promise<Lecture[]> {
    return this.lectureRepository.find();
  }

  async getLecture(idx: number): Promise<Lecture> {
    const lecture: Lecture | undefined = await this.lectureRepository.findByIdx(
      idx,
    );

    if (lecture === undefined) {
      throw new NotFoundException('존재하지 않는 특강');
    }

    return lecture;
  }
}
