import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import validateData from 'src/common/lib/validateData';
import { CreateLectureDto } from 'src/domain/dto/lecture/create-lecture.dto';
import { DeleteInapposite } from 'src/domain/dto/lecture/delete-inapposite.dto';
import { ModifyLectureDto } from 'src/domain/dto/lecture/modify-lecture.dto';
import { Lecture } from 'src/domain/entity/lecture.entity';
import { Place } from 'src/domain/entity/place.entity';
import { User } from 'src/domain/entity/user.entity';
import { ApplicationService } from '../application/application.service';
import { NoticeService } from '../notice/notice.service';
import { PlaceService } from '../place/place.service';
import LectureRepository from './repository/lecture.repository';
import { TagsRepository } from './repository/tag.repository';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    private readonly lectureRepository: LectureRepository,
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository,
    private readonly placeService: PlaceService,
    private readonly applicatoinService: ApplicationService,
    private readonly noticeService: NoticeService,
  ) {}

  getLectures(): Promise<Lecture[]> {
    return this.lectureRepository.find({
      relations: ['tags', 'place', 'user'],
    });
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

  async addLecture(data: CreateLectureDto, user: User): Promise<Lecture> {
    const lecture: Lecture = this.lectureRepository.create({
      title: data.title,
      content: data.content,
      material: data.material,
      startDate: data.startDate,
      endDate: data.endDate,
      user: user,
      picture: data.picture,
    });

    if (data.placeIdx !== undefined) {
      const place: Place = await this.placeService.getPlace(data.placeIdx);

      lecture.place = place;
    }

    const savedLecture: Lecture = await this.lectureRepository.save(lecture);

    data.tags.map(async (tag) => {
      const createTag = this.tagsRepository.create({
        name: tag,
        lecture: savedLecture,
      });
      await this.tagsRepository.save(createTag);
    });

    return savedLecture;
  }

  async modifyLecture(
    idx: number,
    user: User,
    data: ModifyLectureDto,
  ): Promise<Lecture> {
    const lecture: Lecture = await this.getLecture(idx);

    let place: Place;
    if (data.placeIdx !== undefined) {
      place = await this.placeService.getPlace(data.placeIdx);
    }

    if (lecture.uniqueId !== user.uniqueId) {
      throw new ForbiddenException('본인의 특강이 아닙니다');
    }

    this.lectureRepository.merge(lecture, {
      title: data.title,
      content: data.content,
      material: data.material,
      startDate: data.startDate,
      endDate: data.endDate,
      place: place,
      placeIdx: data.placeIdx,
      picture: data.picture,
    });
    return await this.lectureRepository.save(lecture);
  }

  /**
   * @description 부적절한 특강 삭제(관리자)
   */
  async deleteInappositeLecture(
    idx: number,
    data: DeleteInapposite,
  ): Promise<void> {
    const lecture: Lecture = await this.getLecture(idx);

    let expireDate: Date = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    this.noticeService.createNotice(
      lecture.title,
      data.reason,
      lecture.user.name,
      expireDate,
    );

    await this.lectureRepository.remove(lecture);
  }

  async reassignment(lectureIdx: number, placeIdx: number): Promise<void> {
    const lecture: Lecture = await this.getLecture(lectureIdx);
    const place: Place = await this.placeService.getPlace(placeIdx);

    lecture.place = place;
    await this.lectureRepository.save(lecture);
  }

  async auditApplication(lectureIdx: number, user: User): Promise<void> {
    const lecture: Lecture = await this.getLecture(lectureIdx);

    await this.applicatoinService.createApplication(lecture, user);
  }

  async deleteLecture(lectureIdx: number, user: User): Promise<void> {
    const lecture: Lecture = await this.getLecture(lectureIdx);

    if (lecture.uniqueId !== user.uniqueId) {
      throw new ForbiddenException('자신의 특강이 아닙니다');
    }

    await this.lectureRepository.remove(lecture);
  }

  getTodayLecture(): Promise<Lecture[]> {
    return this.lectureRepository.findByDate();
  }
}
