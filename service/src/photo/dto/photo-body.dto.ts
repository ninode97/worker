import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsIn,
} from 'class-validator';
import { SubmisionType } from '../submision-type.enum';

export class PhotoBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  comment: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  workplace: string;

  @IsString()
  @IsIn([SubmisionType.START, SubmisionType.ADDITIONAL, SubmisionType.END])
  submisionType: SubmisionType;
}
