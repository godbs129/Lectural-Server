import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { IPlace } from 'src/common/interfaces/IPlace';
import validateData from 'src/common/lib/validateData';
import { Place } from 'src/domain/entity/place.entity';
import { PlaceRepository } from './repository/place.repository';

@Injectable()
export class PlaceService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getPlace(idx: number): Promise<Place> {
    const place: Place = await this.placeRepository.getPlace(idx);

    if (!validateData(place)) {
      throw new NotFoundException('존재하지 않는 장소');
    }

    return place;
  }

  public async getPlaceFromDodam() {
    const places: AxiosResponse = await axios.get(
      `http://open.dodam.b1nd.com/api/place`,
      {
        headers: {
          Authorization:
            'Bearer ' + this.configService.get<string>('accessToken'),
        },
      },
    );

    places.data.data.map((place: IPlace) => {
      this.savePlaces(place);
    });
  }

  public savePlaces(place: IPlace) {
    this.placeRepository.save(place);
  }
}
