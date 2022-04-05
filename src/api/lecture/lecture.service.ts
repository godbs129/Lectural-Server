import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import validateData from 'src/common/lib/validateData';
import { LectureDto } from 'src/domain/dto/lecture/lecture.dto';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { Place } from 'src/domain/entity/place.entity';
import { User } from 'src/domain/entity/user.entity';
import { PlaceService } from '../place/place.service';
import LectureRepository from './repository/lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureRepository: LectureRepository,
    private readonly placeService: PlaceService,
  ) {}

  getLectures(): Promise<Lecture[]> {
    return this.lectureRepository.find();
  }

  async getLecture(idx: number): Promise<Lecture> {
    const lecture: Lecture | undefined = await this.lectureRepository.findByIdx(
      idx,
    );

    if (!validateData(lecture)) {
      throw new NotFoundException('존재하지 않는 특강');
    }

    return lecture;
  }

  async addLecture(data: LectureDto, user: User): Promise<void> {
    const place: Place = await this.placeService.getPlace(data.placeIdx);

    const lecture: Lecture = this.lectureRepository.create({
      title: data.title,
      content: data.content,
      material: data.material,
      startDate: data.startDate,
      endDate: data.endDate,
      user: user,
      place: place,
    });

    await this.lectureRepository.save(lecture);
  }

  /**
   * @description 부적절한 특강 삭제(관리자)
   */
  async deleteLecture(idx: number): Promise<void> {
    const lecture: Lecture = await this.getLecture(idx);

    await this.lectureRepository.remove(lecture);
  }
}
