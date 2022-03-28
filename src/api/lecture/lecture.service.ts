import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (lecture === undefined) {
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
    });
    lecture.user = user;
    lecture.place = place;

    await this.lectureRepository.save(lecture);
  }
}
