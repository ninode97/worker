import {
  Controller,
  Get,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
  MethodNotAllowedException,
} from '@nestjs/common';
import { WorkdayService } from './workday.service';

import { UserService } from 'src/user/user.service';
import * as moment from 'moment';

import { GetUser } from 'src/user/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { WorkdayDto } from './dto/workday.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('workday')
export class WorkdayController {
  constructor(
    private readonly workdayService: WorkdayService,
    private readonly userService: UserService,
  ) {}

  // For Worker
  @Get('/status')
  getWorkdayInfoStatus(@GetUser() user: User) {
    return this.workdayService.isWorkdayInfoCreatedV2(user);
  }

  @Post()
  createWorkday() {
    return this.workdayService.createWorkday();
  }

  @Get()
  getWorkdays(@GetUser() user: User, @Query() workday: WorkdayDto) {
    if (!workday.workday || !moment(new Date(workday.workday)).isValid()) {
      throw new UnprocessableEntityException('Workday is not valid!');
    } else {
      let splited = workday.workday.split('-');

      if (splited.length === 3) {
        return this.workdayService.getWorkdaysByDayV2(user, workday);
      } else if (splited.length === 2) {
        return this.workdayService.getWorkdaysByMonthV2(user, workday);
      } else {
        throw new UnprocessableEntityException('Workday is not valid!');
      }
    }
  }

  @Get('/admin')
  async getWorkdaysByAdmin(
    @GetUser() requestedBy: User,
    @Query() workday: WorkdayDto,
  ) {
    if (requestedBy.role.role === 'admin') {
      if (!workday.workday || !moment(new Date(workday.workday)).isValid()) {
        throw new UnprocessableEntityException('Workday is not valid!');
      } else {
        let splited = workday.workday.split('-');
        let user = workday.username
          ? await this.userService.getUserByUsername(workday.username)
          : null;
        if (splited.length === 3) {
          return this.workdayService.getWorkdaysByDayByAdmin(user, workday);
        } else if (splited.length === 2) {
          return this.workdayService.getWorkdaysByMonthByAdmin(user, workday);
        } else {
          throw new UnprocessableEntityException('Workday is not valid!');
        }
      }
    }
    throw new MethodNotAllowedException();
  }
}
