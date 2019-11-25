import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { WorkdayService } from './workday.service';
import { WorkdayOptions } from './interfaces/workday-options.interface';
import { WorkdayInfoDto } from './dto/workday-info.dto';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { UserService } from 'src/user/user.service';
import * as moment from 'moment';
import { Workday } from './workday.entity';

function reduceNullObjectKeys(object) {
  const reduced = Object.keys(object).map(key => {
    if (object[key] === undefined || object[key] === null) {
      delete object[key];
    }
  });
  return object;
}

@Controller('workday')
export class WorkdayController {
  constructor(
    private readonly workdayService: WorkdayService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getWorkdays(@Query() workdayInfoDto: WorkdayInfoDto) {
    let {
      isFinished,
      username,
      workday,
      started_at,
      finished_at,
    } = workdayInfoDto;

    const user = await this.userService.getUserByUsername(username);
    const targetDate = moment(new Date(workday));

    const testStartedAtDate = moment(new Date(started_at));
    const testFinishedAtDate = moment(new Date(finished_at));

    let foundedWorkday: Workday;
    if (!targetDate.isValid()) {
      foundedWorkday = await this.workdayService.createWorkday();
    } else {
      foundedWorkday = await this.workdayService.getWorkdays({
        workday: new Date(workday),
      })[0];
    }

    if (username && !user) {
      throw new NotFoundException('There is no such user!');
    }

    if (started_at && !testStartedAtDate.isValid()) {
      throw new UnprocessableEntityException('Started at date is not valid!');
    }

    if (finished_at && !testFinishedAtDate.isValid()) {
      throw new UnprocessableEntityException('Finished at date is not valid!');
    }

    let data: WorkdayInfoOptions = reduceNullObjectKeys({
      user,
      isFinished,
      workday: foundedWorkday,
      started_at,
      finished_at,
    });

    return this.workdayService.getWorkersWorkdayInfo(data);
  }

  @Post()
  createWorkday() {
    return this.workdayService.createWorkday();
  }
}
