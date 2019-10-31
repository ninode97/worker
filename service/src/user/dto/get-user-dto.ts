import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class GetUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsNumber()
  id: number;
}
