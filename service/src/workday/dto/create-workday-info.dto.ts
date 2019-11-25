import { User } from '../../user/user.entity';
import { Workday } from '../workday.entity';

export class CreateWorkdayInfoDto {
  user: User;
  workday: Workday;
}
