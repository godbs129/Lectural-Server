import { Controller, Post } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post('/')
  public async getPlaceAndSave() {
    this.placeService.getPlaceFromDodam();
  }
}
