import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsIn,
  IsNumber,
} from 'class-validator';

export class AddCommentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(3000)
  comment: string;

  @IsNumber()
  photoId: number;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  username: string;
}
