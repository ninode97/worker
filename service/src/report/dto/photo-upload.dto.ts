import { IsString, IsDate, IsIn } from 'class-validator';
import { SubmisionType } from 'src/photo/submision-type.enum';

export class PhotoUploadReportDto {
  @IsString()
  username: string;

  @IsDate()
  addedAt: Date;

  @IsString()
  photoPath: string;

  @IsString()
  photoType: string;

  @IsString()
  photoName: string;

  @IsString()
  @IsIn([SubmisionType.START, SubmisionType.ADDITIONAL, SubmisionType.END])
  submisionType: SubmisionType;

  @IsString()
  comment: string;
}
