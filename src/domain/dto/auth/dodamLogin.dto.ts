import { IsNotEmpty, IsString } from 'class-validator';

export default class DodamLoginDto {
  @IsNotEmpty()
  @IsString()
  code!: string;
}
