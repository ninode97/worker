import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  role: string;
}
