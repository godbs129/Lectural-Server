import { Injectable, NotFoundException } from '@nestjs/common';
import { Place } from 'src/domain/entity/place.entity';
import { PlaceRepository } from './repository/place.repository';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  public async getPlace(idx: number): Promise<Place> {
    const place: Place = await this.placeRepository.getPlace(idx);

    if (place === undefined) {
      throw new NotFoundException('존재하지 않는 장소');
    }

    return place;
  }
}
