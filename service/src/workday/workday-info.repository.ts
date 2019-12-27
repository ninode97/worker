import { EntityRepository, Repository, Between } from 'typeorm';
import { WorkdayInfo } from './workday-info.entity';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { CreateWorkdayInfoDto } from './dto/create-workday-info.dto';
import { UpdateWorkdayInfoDto } from './dto/update-workday-info.dto';
import { User } from '../user/user.entity';
import { Workday } from './workday.entity';
import { InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';

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
}
