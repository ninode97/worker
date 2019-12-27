import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  Length,
  IsIn,
} from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsIn(['admin', 'user'])
  role: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @IsBoolean()
  isBlocked: boolean;

  @IsOptional()
  @IsString()
  @Length(4)
  last4DigitsOfId: string;
}
