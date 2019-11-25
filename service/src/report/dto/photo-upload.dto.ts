import { IsString, IsDate } from 'class-validator';

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
}
