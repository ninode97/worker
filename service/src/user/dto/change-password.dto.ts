import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
