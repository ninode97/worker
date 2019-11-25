import { User } from '../../user/user.entity';
import { Workday } from '../workday.entity';

export class UpdateWorkdayInfoDto {
  isFinished: boolean;
  user: User;
  workday: Workday;
}
