import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsIn,
  IsNumber,
} from 'class-validator';

export class PushTokenDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  pushToken: string;
}
