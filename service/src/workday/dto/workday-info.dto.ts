import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export interface WorkdayInfoDto {
  isFinished?: boolean;
  username?: string;
  workday?: string;
  started_at?: Date;
  finished_at?: Date;
}
