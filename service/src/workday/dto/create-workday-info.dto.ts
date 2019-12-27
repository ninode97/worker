import { User } from '../../user/user.entity';
import { Workday } from '../workday.entity';
import { Workplace } from '../../workplace/workplace.entity';

export class CreateWorkdayInfoDto {
  user: User;
  workday: Workday;
  workplace: Workplace;
}
