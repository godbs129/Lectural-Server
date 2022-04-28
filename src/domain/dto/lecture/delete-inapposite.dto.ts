import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteInapposite {
  @IsNotEmpty()
  @IsString()
  reason!: string;
}
