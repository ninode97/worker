import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UnprocessableEntityException,
  NotFoundException,
  UseGuards,
  MethodNotAllowedException,
} from '@nestjs/common';
import { WorkdayService } from './workday.service';
import { WorkdayOptions } from './interfaces/workday-options.interface';
import { WorkdayInfoDto } from './dto/workday-info.dto';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { UserService } from 'src/user/user.service';
import * as moment from 'moment';
import { Workday } from './workday.entity';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

function reduceNullObjectKeys(object) {
  const reduced = Object.keys(object).map(key => {
    if (object[key] === undefined || object[key] === null) {
      delete object[key];
    }
  });
  return object;
}

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

  @Get()
  async getWorkdays(
    @GetUser() requestedBy: User,
    @Query() workdayInfoDto: WorkdayInfoDto,
  ) {
    let {
      isFinished,
      username,
      workday,
      started_at,
      finished_at,
    } = workdayInfoDto;

    // Admin role
    if (requestedBy.role.role === 'admin') {
      const user = await this.userService.getUserByUsername(username);

      if (!moment(new Date(workday)).isValid()) {
        throw new UnprocessableEntityException('Workday is not valid!');
      }

      let options = {
        user,
        workday: await this.workdayService.getWorkday(workday),
      };


      if (this.isDateTargetMonth(workday)) {
        options.workday = await this.workdayService.ensureMonthFirstDay(
          workday,
        );
      }

      options = reduceNullObjectKeys(options);

      if (options.workday) {
        if (workday && this.isDateTargetMonth(workday)) {
          return this.workdayService.getWorkdaysByMonth(options);
        } else if (workday && this.isDateTargetDay(workday)) {
          return this.workdayService.getWorkdaysByDay(options);
        } else {
          return this.workdayService.getWorkersWorkdayInfo(options);
        }
      } else {
        return [];
      }
    } else if (requestedBy.role.role === 'user') {
      let options = {
        user: requestedBy,
        workday: await this.workdayService.getWorkday(workday),
      };

      if (this.isDateTargetMonth(workday)) {
        options.workday = await this.workdayService.ensureMonthFirstDay(
          workday,
        );
      }

      if (options.workday) {
        if (workday && this.isDateTargetMonth(workday)) {
          return this.workdayService.getWorkdaysByMonth(options);
        } else if (workday && this.isDateTargetDay(workday)) {
          return this.workdayService.getWorkdaysByDay(options);
        } else {
          return this.workdayService.getWorkersWorkdayInfo(options);
        }
      } else {
        return [];
      }
    } else {
      throw new MethodNotAllowedException('There is no such role!');
    }
  }

  @Post()
  createWorkday() {
    return this.workdayService.createWorkday();
  }

  // Helpers

  private isDateTargetMonth(date) {
    if (date.split('-').length === 2) {
      return true;
    }
    return false;
  }

  private isDateTargetDay(date) {
    if (date.split('-').length === 3) {
      return true;
    }
    return false;
  }
}
