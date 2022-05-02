import { IsNotEmpty, IsString } from 'class-validator';

export class RequestDto {
  @IsNotEmpty()
  @IsString()
  content!: string;
}
