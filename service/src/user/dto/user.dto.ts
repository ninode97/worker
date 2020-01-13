import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  Length,
  IsIn,
} from 'class-validator';
export class UserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;
}
