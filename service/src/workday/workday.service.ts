import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkdayRepository } from './workday.repository';
import { WorkdayInfoRepository } from './workday-info.repository';
import { WorkdayOptions } from './interfaces/workday-options.interface';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { Workday } from './workday.entity';
import { UpdateWorkdayInfoDto } from './dto/update-workday-info.dto';
import { CreateWorkdayInfoDto } from './dto/create-workday-info.dto';
import { User } from '../user/user.entity';
import * as moment from 'moment';

@Injectable()
export class WorkdayService {
  constructor(
    @InjectRepository(WorkdayRepository)
    private readonly workdayRepository: WorkdayRepository,
    @InjectRepository(WorkdayInfoRepository)
    private readonly workdayInfoRepository: WorkdayInfoRepository,
  ) {}

  async getWorkday(workday: string) {
    return this.workdayRepository.getWorkday(workday);
  }
  async getWorkdays(options: WorkdayOptions) {
    return this.workdayRepository.getWorkdays(options);
  }

  async createWorkday(): Promise<Workday> {
    return this.workdayRepository.createWorkday();
  }

  async createWorkdayMonthStartDay(workday) {
    let w = await new Workday();
    try {
      w.workday = workday;
      w = await w.save();
      return w;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        console.log(`Exists, just return workday!`);
        return await this.workdayRepository.findOne({
          where: { workday: workday },
        });
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async getWorkersWorkdayInfo(workdayInfoOptions: WorkdayInfoOptions) {
    return this.workdayInfoRepository.getWorkersWorkdayInfo(workdayInfoOptions);
  }

  async createWorkdayInfo(createWorkdayInfoDto: CreateWorkdayInfoDto) {
    return this.workdayInfoRepository.createWorkdayInfo(createWorkdayInfoDto);
  }

  async updateWorkdayInfo(updateWorkdayInfoDto: UpdateWorkdayInfoDto) {
    return this.workdayInfoRepository.updateWorkdayInfoV2(updateWorkdayInfoDto);
  }

  async endWorkdayInfo(user: User, workday: Workday) {
    return this.workdayInfoRepository.endWorkdayInfo(user, workday);
  }

  async isWorkdayInfoCreated(user: User, workday: Workday) {
    return this.workdayInfoRepository.isWorkdayInfoCreatedV2(user);
  }

  async isWorkdayInfoCreatedV2(user: User) {
    return this.workdayInfoRepository.isWorkdayInfoCreatedV2(user);
  }

  async getWorkdaysByMonth(workdayInfoOptions: WorkdayInfoOptions) {
    return this.workdayInfoRepository.getWorkdaysByMonth(workdayInfoOptions);
  }

  async getWorkdaysByDay(workdayInfoOptions: WorkdayInfoOptions) {
    return this.workdayInfoRepository.getWorkdaysByDay(workdayInfoOptions);
  }

  async ensureMonthFirstDay(workday: string) {
    return this.workdayRepository.ensureMonthFirstDay(workday);
  }
  async getWorkdayInfo(user: User) {
    return this.workdayInfoRepository.getWorkdayInfo(user);
  }
}
