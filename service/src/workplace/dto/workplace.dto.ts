import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';
export class WorkplaceDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(150)
  @MinLength(5)
  workplaceCode: string;
}
