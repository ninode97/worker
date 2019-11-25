import { User } from '../../user/user.entity';
import { Workday } from '../workday.entity';

export interface WorkdayInfoOptions {
  isFinished?: boolean;
  user?: User;
  workday?: Workday;
  started_at?: Date;
  finished_at?: Date;
}
