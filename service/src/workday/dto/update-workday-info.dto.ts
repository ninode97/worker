import { User } from '../../user/user.entity';
import { Workday } from '../workday.entity';
import { Workplace } from '../../workplace/workplace.entity';

export class UpdateWorkdayInfoDto {
  user: User;
  workday: Workday;
  workplace: Workplace;
}
