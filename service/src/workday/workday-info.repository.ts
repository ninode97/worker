import { EntityRepository, Repository, Between } from 'typeorm';
import { WorkdayInfo } from './workday-info.entity';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { CreateWorkdayInfoDto } from './dto/create-workday-info.dto';
import { UpdateWorkdayInfoDto } from './dto/update-workday-info.dto';
import { User } from '../user/user.entity';
import { Workday } from './workday.entity';
import { InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';
import { WorkdayDto } from './dto/workday.dto';
import { Workplace } from 'src/workplace/workplace.entity';

@EntityRepository(WorkdayInfo)
export class WorkdayInfoRepository extends Repository<WorkdayInfo> {
  private removeSensitiveData(data: WorkdayInfo[]) {
    return data.map(record => {
      delete record.user.password;
      delete record.user.salt;
      delete record.user.role.createdAt;
      delete record.user.role.accessLevel;
      delete record.user.role.id;
      return record;
    });
  }

  private reduceNullObjectKeys(object) {
    const reduced = Object.keys(object).map(key => {
      if (object[key] === undefined || object[key] === null) {
        delete object[key];
      }
    });
    return object;
  }

  async getWorkersWorkdayInfo(workdayInfoOptions: WorkdayInfoOptions) {
    const data = await this.find({ where: workdayInfoOptions });
    return this.removeSensitiveData(data);
  }

  async getWorkdaysByMonth(workdayInfoOptions: WorkdayInfoOptions) {
    const { workday, user } = workdayInfoOptions;

    const startMonth = moment(new Date(workday.workday));
    startMonth.set('D', 1);
    const endMonth = startMonth.clone();
    endMonth.add(1, 'M');

    let options = {
      user: workdayInfoOptions.user,
      startTime: Between(startMonth, endMonth),
    };

    options = this.reduceNullObjectKeys(options);

    const workdays = await this.find({
      where: options,
    });
    console.log(workdays);
    console.log(options);

    return this.removeSensitiveData(workdays);
  }

  async getWorkdaysByDay(workdayInfoOptions: WorkdayInfoOptions) {
    const data = await this.find({ where: workdayInfoOptions });
    return this.removeSensitiveData(data);
  }

  async createWorkdayInfo(createWorkdayInfoDto: CreateWorkdayInfoDto) {
    const { user, workday, workplace } = createWorkdayInfoDto;
    const workdayInfo = new WorkdayInfo();
    workdayInfo.startTime = new Date();
    workdayInfo.user = user;
    workdayInfo.workday = workday;
    workdayInfo.workplace = workplace;

    try {
      return workdayInfo.save();
    } catch (err) {
      console.log(err.code);
      return null;
    }
  }

  async updateWorkdayInfo(updateWorkdayInfoDto: UpdateWorkdayInfoDto) {
    const workdayInfo = await this.findOne({
      where: {
        user: updateWorkdayInfoDto.user,
        workday: updateWorkdayInfoDto.workday,
      },
    });
    workdayInfo.endTime = new Date();
    workdayInfo.user = updateWorkdayInfoDto.user;
    workdayInfo.workday = updateWorkdayInfoDto.workday;

    try {
      await workdayInfo.save();
    } catch (err) {
      console.log(err);
    }
  }

  async updateWorkdayInfoV2(updateWorkdayInfoDto: UpdateWorkdayInfoDto) {
    const { user, workday } = updateWorkdayInfoDto;
    // Surelly will be only one of this kind!
    let workdayInfo = await this.findOne({ user, workday, endTime: null });
    try {
      workdayInfo = await workdayInfo.save();
      return workdayInfo;
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, when finishing the work',
      );
    }
  }

  async isWorkdayInfoCreated(user: User, workday: Workday) {
    const data = await this.find({ where: { workday, user } });
    return data.length > 0 ? true : false;
  }

  async isWorkdayInfoCreatedV2(user: User) {
    const data = await this.findOne({ where: { user: user, endTime: null } });
    return data ? true : false;
  }

  async endWorkdayInfo(user: User, workday: Workday) {
    const workdayInfo = await this.findOne({
      where: { user, endTime: null },
    });
    console.log(workdayInfo);
    try {
      workdayInfo.endTime = new Date();
      return workdayInfo.save();
    } catch (err) {
      return null;
    }
  }
  async getWorkdayInfo(user: User) {
    return this.findOne({ where: { user, endTime: null } });
  }

  async getWorkdaysByMonthV2(
    user: User,
    workdayDto: WorkdayDto,
    workplace: Workplace,
  ) {
    const { workday } = workdayDto;

    if (workdayDto.workplace && !workplace) {
      return [];
    }

    const startMonth = moment(new Date(workday));
    startMonth.set('D', 1);
    const endMonth = startMonth.clone();
    endMonth.add(1, 'M');

    let options = {
      user: user,
      startTime: Between(startMonth, endMonth),
    };

    let workdays = await this.find({
      where: options,
    });

    if (workplace) {
      workdays = workdays.filter(
        w => w.workplace.workplaceCode === workplace.workplaceCode,
      );
    }
    return this.transformData(workdays);
  }

  async getWorkdaysByDayV2(user: User, workplace: Workplace, workday: Workday) {
    let records = await this.find({
      where: {
        user,
        workday,
      },
    });

    if (workplace) {
      records = records.filter(
        w => w.workplace.workplaceCode === workplace.workplaceCode,
      );
    }

    console.log('WTFFFFWFWFWFWFWFFWW!');
    return this.transformData(records);
  }

  //admin
  async getWorkdaysByDayByAdmin(
    user: User,
    workplace: Workplace,
    workday: Workday,
  ) {
    let records = await this.find({
      where: {
        workday,
      },
    });

    if (workplace) {
      records = records.filter(
        w => w.workplace.workplaceCode === workplace.workplaceCode,
      );
    }
    if (user) {
      records = records.filter(w => w.user.username === user.username);
    }

    return this.transformForAdmin(records);
  }
  async getWorkdaysByMonthByAdmin(
    user: User,
    workdayDto: WorkdayDto,
    workplace: Workplace,
  ) {
    console.log(`Entry POINT IS HEREW!`);
    console.log(user);
    const { workday } = workdayDto;

    const startMonth = moment(new Date(workday));
    startMonth.set('D', 1);
    const endMonth = startMonth.clone();
    endMonth.add(1, 'M');

    let options = {
      startTime: Between(startMonth, endMonth),
    };

    let workdays = await this.find({
      where: options,
    });

    if (workplace) {
      workdays = workdays.filter(
        w => w.workplace.workplaceCode === workplace.workplaceCode,
      );
    }
    if (user) {
      workdays = workdays.filter(w => w.user.username === user.username);
    }
    return this.transformForAdmin(workdays);
  }
  // Transformations!
  private transformData(data: WorkdayInfo[]) {
    return data.map((record, index) => {
      const d1 = moment(new Date(record.startTime));
      const d2 = moment(new Date(record.endTime));
      return {
        id: index + 1,
        workplace: record.workplace.workplaceCode,
        startTime: record.startTime,
        endTime: record.endTime ? record.endTime : 'n/a',
        time: this.calculateTime(d1, d2, record.endTime),
      };
    });
  }
  private transformForAdmin(data: WorkdayInfo[]) {
    return data.map((record, index) => {
      const d1 = moment(new Date(record.startTime));
      const d2 = moment(new Date(record.endTime));
      return {
        id: index + 1,
        username: record.user.username,
        firstName: record.user.firstName,
        lastName: record.user.lastName,
        workplace: record.workplace.workplaceCode,
        startTime: record.startTime,
        endTime: record.endTime ? record.endTime : 'n/a',
        time: this.calculateTime(d1, d2, record.endTime),
      };
    });
  }
  private calculateTime = (time1, time2, status) => {
    if (status) {
      const start_date = moment(time1, 'YYYY-MM-DD HH:mm:ss');
      const end_date = moment(time2, 'YYYY-MM-DD HH:mm:ss');
      const x = moment.duration(end_date.diff(start_date)).asMilliseconds();
      const seconds = moment.duration(x).seconds();
      const minutes = moment.duration(x).minutes();
      const hours = Math.trunc(moment.duration(x).asHours());

      return `${this.formatTime(hours)}:${this.formatTime(minutes)}`;
    } else {
      return 'Not finished yet';
    }
  };
  private formatTime(time) {
    if (time.toString().length < 2) {
      return `0${time}`;
    }
    return time;
  }
}
