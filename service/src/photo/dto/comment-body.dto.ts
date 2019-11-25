import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsIn,
} from 'class-validator';
import { SubmisionType } from '../submision-type.enum';

export class CommentBodyDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(3000)
  comment: string;

  @IsString()
  @IsIn([SubmisionType.START, SubmisionType.ADDITIONAL, SubmisionType.END])
  submisionType: SubmisionType;
}
