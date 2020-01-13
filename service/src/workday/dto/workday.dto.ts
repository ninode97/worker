import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export interface WorkdayDto {
  username?: string;
  workday?: string;
  workplace?: string;
}
