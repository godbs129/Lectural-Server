import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ModifyLectureDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  placeIdx?: number;

  @IsOptional()
  @IsString()
  picture?: string;
}
